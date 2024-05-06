import { useRef, useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import invariant from 'tiny-invariant';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import type { Plan, ExchangeId, ExchangeCredential, SuccessOrderResult, FailedOrderResult, OrderId, Order } from '../models';
import { VIEW_PRECISION, EXCHANGES } from '../master';
import { plansAtom, getNextIndexFromNow, getNextAtByIndex } from './plan-service';
import { exchangeCredentialsAtom } from './exchange-service';
import { store } from '../store';
import { getTicker, execBuyOrder } from './exchange-api-service/universal';
import { orderFamily } from './order-service';
import { accountAtom } from './account-service';
import { refreshTotalAmount } from './aggregate/analysis-service';
import { scheduleNotification } from './notification-service';

export const FIND_ORDERS_TASK = 'FIND_ORDERS_TASK';
export const MAX_NEXT_AT_DELTA_MS = 1000 * 60 * 20; // 20 minutes
export const FOREGROUND_INTERVAL_MS = 1000 * 60; // 1 minute
export const BACKGROUND_INTERVAL_SEC = 60 * 15; // 15 minutes
export const RECOVERY_NOTIFICATION_DELTA_MS = 1000 * 60 * 60; // 1 hour

// 15分以下には出来ない
invariant(BACKGROUND_INTERVAL_SEC >= 60 * 15);
// BACKGROUND_INTERVAL_SECより大きい必要がある
invariant(RECOVERY_NOTIFICATION_DELTA_MS >= BACKGROUND_INTERVAL_SEC * 1000);

export const findWindowedPlans = (now: number, plans: Plan[]) => {
  return plans
    .filter((plan) => plan.status.enabled && now - MAX_NEXT_AT_DELTA_MS < plan.status.nextAt && plan.status.nextAt < now)
    .sort((a, b) => a.status.nextAt - b.status.nextAt); // ascending order
};

export const calcBtcAmount = (ask: number, quoteAmount: number, exchangeId: ExchangeId): number => {
  const exchange = EXCHANGES.find((e) => e.id === exchangeId);

  if (!exchange) {
    throw new Error('EXCHANGE_NOT_FOUND');
  }

  const { orderPrecision, minBtcAmt, minJpyAmt } = exchange;

  const origBtcAmount = Number((quoteAmount / ask).toFixed(VIEW_PRECISION)); // 四捨五入
  const factor = 10 ** orderPrecision;
  const btcAmount = Math.floor(origBtcAmount * factor) / factor; // 切り捨て

  if (btcAmount < minBtcAmt) {
    throw new Error('BTC_AMOUNT_TOO_SMALL');
  }

  if (btcAmount * ask < minJpyAmt) {
    throw new Error('JPY_AMOUNT_TOO_SMALL');
  }

  return btcAmount;
};

export const buyQuoteAmount = async (
  exchangeCredential: ExchangeCredential,
  quoteAmount: number,
  dryRun: boolean,
): Promise<SuccessOrderResult | FailedOrderResult> => {
  const ticker = await getTicker(exchangeCredential.exchangeId);
  const btcAmount = calcBtcAmount(ticker.ask, quoteAmount, exchangeCredential.exchangeId);
  const result = await execBuyOrder(exchangeCredential, btcAmount, dryRun);

  return result;
};

let runningCount = 0;

export const findAndExecuteOrders = async () => {
  console.log('finding and executing orders...');

  runningCount++;

  if (runningCount > 1) {
    console.log('already running the findAndExecuteOrders');

    return;
  }

  try {
    const now = Date.now();
    const account = await store.get(accountAtom);
    const plans = await store.get(plansAtom);
    const exchangeCredentials = await store.get(exchangeCredentialsAtom);

    const windowedPlans = findWindowedPlans(now, plans);
    const updatedPlans = plans;

    for (const plan of windowedPlans) {
      const { exchangeId, quoteAmount } = plan;
      const exchangeCredential = exchangeCredentials.find((c) => c.exchangeId === exchangeId);
      if (!exchangeCredential) {
        console.log(`exchange credential not found: exchangeId=${exchangeId}`);
        plan.status.enabled = false;
        continue;
      }

      // アカウントレベルでドライラン、或いはプランレベルでドライラン指示があればドライランとする
      const dryRun = account.dryRun || plan.dryRun;

      console.log(`execute order: exchangeId=${exchangeId}, quoteAmount=${quoteAmount}`);

      const orderResult = await buyQuoteAmount(exchangeCredential, quoteAmount, dryRun);

      console.log(`order result: ${JSON.stringify(orderResult)}`);

      const orderId = `ORD_${account.numOfOrders}` as OrderId;
      const order: Order = {
        id: orderId,
        orderedAt: new Date().getTime(),
        planSnapshot: plan,
        dryRun,
        result: orderResult,
      };
      await store.set(orderFamily(orderId), order);
      await store.set(accountAtom, { ...account, numOfOrders: account.numOfOrders + 1 });

      const targetPlanIndex = updatedPlans.findIndex((p) => p.id === plan.id);
      invariant(targetPlanIndex !== -1, 'PLAN_NOT_FOUND');

      if (orderResult.status === 'SUCCESS') {
        const nextIndex = getNextIndexFromNow(plan.planTypeId, plan.status.refAt, now);
        const nextAt = getNextAtByIndex(plan.planTypeId, plan.status.refAt, nextIndex);

        // windowedPlansの値を更新
        updatedPlans[targetPlanIndex].status.nextIndex = nextIndex;
        updatedPlans[targetPlanIndex].status.nextAt = nextAt;
      } else {
        // windowedPlansの値を更新
        updatedPlans[targetPlanIndex].status.enabled = false;
      }
    }

    await store.set(plansAtom, updatedPlans);

    // 投資パフォーマンスを再集計
    console.log('refresh total amount...');

    await refreshTotalAmount();

    console.log('refresh total amount done');
  } finally {
    runningCount--;
  }
};

export const intervalProcess = async () => {
  // リカバリー通知予約を再登録する
  await setScheduledRecoveryNotification();
  // 注文を実行する
  await findAndExecuteOrders();
};

// アプリがバックグラウンドの時しか発動しない
TaskManager.defineTask(FIND_ORDERS_TASK, async () => {
  const now = Date.now();

  console.log(`got background fetch call at date: ${new Date(now).toISOString()}`);

  await intervalProcess();

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export async function registerBackgroundFetchAsync() {
  console.log('background fetch is registered');

  return BackgroundFetch.registerTaskAsync(FIND_ORDERS_TASK, {
    minimumInterval: BACKGROUND_INTERVAL_SEC,
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export async function unregisterBackgroundFetchAsync() {
  console.log('background fetch is unregistered');

  return BackgroundFetch.unregisterTaskAsync(FIND_ORDERS_TASK);
}

export const setScheduledRecoveryNotification = async () => {
  console.log('re-schedule recovery notification');

  await scheduleNotification({
    title: 'アプリの終了を検知しました',
    body: 'アプリを開くことでスケジューラが再開します',
    type: 'WAKEUP_CALL',
    date: Date.now() + RECOVERY_NOTIFICATION_DELTA_MS,
  });
};

// アプリがフォアグラウンドの時だけ定期的な処理を行う
export const useForegroundIntervalProcess = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('foreground interval monitor is registered');

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('app is activated');

        // フォアグラウンドになったタイミングでリカバリー通知再登録だけ実行する
        setScheduledRecoveryNotification().then(() => {
          // 一定時間たった後に繰り返し処理するようにする
          intervalRef.current = setInterval(intervalProcess, FOREGROUND_INTERVAL_MS);
        });
      } else {
        console.log('app is deactivated');
        if (intervalRef.current) {
          console.log('foreground interval monitor is unregistered');
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      appState.current = nextAppState;
    });

    // アプリがフォアになった際の処理を一度実行する
    // フォアグラウンドになったタイミングでリカバリー通知再登録だけ実行する
    setScheduledRecoveryNotification().then(() => {
      // 一定時間たった後に繰り返し処理するようにする
      intervalRef.current = setInterval(intervalProcess, FOREGROUND_INTERVAL_MS);
    });

    return () => {
      subscription.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};
