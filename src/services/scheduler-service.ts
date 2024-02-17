import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Plan, ExchangeId, ExchangeCredential } from '../models';
import { VIEW_PRECISION, EXCHANGES } from '../master';
import { plansAtom, getNextIndexFromNow, getNextAtByIndex } from './plan-service';
import { exchangeCredentialsAtom } from './exchange-service';
import { store } from '../store';
import { getTicker, execBuyOrder } from './exchange-api-service/universal';

export const FIND_ORDERS_TASK = 'FIND_ORDERS_TASK';
export const MAX_NEXT_AT_DELTA_MS = 1000 * 60 * 20; // 20 minutes

export const findWindowedPlans = (now: number, plans: Plan[]) => {
  return plans
    .filter((plan) => plan.status.enabled && now - MAX_NEXT_AT_DELTA_MS < plan.status.nextAt && plan.status.nextAt < now)
    .toSorted((a, b) => a.status.nextAt - b.status.nextAt); // ascending order
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
): Promise<{ status: 'SUCCESS' | 'ORDER_FAILED' | 'EXCHANGE_CREDENTIAL_NOT_FOUND' }> => {
  const ticker = await getTicker(exchangeCredential.exchangeId);
  const btcAmount = calcBtcAmount(ticker.ask, quoteAmount, exchangeCredential.exchangeId);
  const result = await execBuyOrder(exchangeCredential, btcAmount);

  return result;
};

TaskManager.defineTask(FIND_ORDERS_TASK, async () => {
  const now = Date.now();

  console.log(`got background fetch call at date: ${new Date(now).toISOString()}`);

  const plans = await store.get(plansAtom);
  const exchangeCredentials = await store.get(exchangeCredentialsAtom);

  const windowedPlans = findWindowedPlans(now, plans);

  for (const plan of windowedPlans) {
    const { exchangeId, quoteAmount } = plan;
    const exchangeCredential = exchangeCredentials.find((c) => c.exchangeId === exchangeId);
    if (!exchangeCredential) {
      console.log(`exchange credential not found: exchangeId=${exchangeId}`);
      plan.status.enabled = false;
      continue;
    }

    console.log(`execute order: exchangeId=${exchangeId}, quoteAmount=${quoteAmount}`);

    const orderResult = await buyQuoteAmount(exchangeCredential, quoteAmount);

    console.log(`order result: ${JSON.stringify(orderResult)}`);

    if (orderResult.status === 'SUCCESS') {
      const nextIndex = getNextIndexFromNow(plan, now);
      const nextAt = getNextAtByIndex(plan, nextIndex);

      plan.status.nextIndex = nextIndex;
      plan.status.nextAt = nextAt;
    } else {
      plan.status.enabled = false;
    }
  }

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(FIND_ORDERS_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(FIND_ORDERS_TASK);
}
