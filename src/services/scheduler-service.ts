import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Schedule, ExchangeId, EXCHANGES } from '../models';
import { loadSchedules, getNextIndexFromNow, getNextAtByIndex } from './schedule-service';
import { loadCredential } from './exchange-credential-service';
import { getTicker, execBuyOrder } from './exchange-api-service/universal';

export const FIND_ORDERS_TASK = 'FIND_ORDERS_TASK';
export const MAX_NEXT_AT_DELTA_MS = 1000 * 60 * 20; // 20 minutes

export const findWindowedSchedules = (now: number, schedules: Schedule[]) => {
  return schedules
    .filter((schedule) => schedule.status.enabled && now - MAX_NEXT_AT_DELTA_MS < schedule.status.nextAt && schedule.status.nextAt < now)
    .toSorted((a, b) => a.status.nextAt - b.status.nextAt); // ascending order
};

export const calcBtcAmount = (ask: number, quoteAmount: number, exchangeId: ExchangeId): number => {
  const exchange = EXCHANGES.find((e) => e.id === exchangeId);

  if (!exchange) {
    throw new Error('EXCHANGE_NOT_FOUND');
  }

  const { viewPrecision, orderPrecision, minAmt } = exchange;

  const origBtcAmount = Number((quoteAmount / ask).toFixed(viewPrecision)); // 四捨五入
  const factor = 10 ** orderPrecision;
  const btcAmount = Math.floor(origBtcAmount * factor) / factor; // 切り捨て

  if (btcAmount < minAmt) {
    throw new Error('AMOUNT_TOO_SMALL');
  }

  return btcAmount;
};

export const buyQuoteAmount = async (
  exchangeId: ExchangeId,
  quoteAmount: number,
): Promise<{ status: 'SUCCESS' | 'ORDER_FAILED' | 'EXCHANGE_CREDENTIAL_NOT_FOUND' }> => {
  const credential = await loadCredential(exchangeId);

  if (!credential) {
    return { status: 'EXCHANGE_CREDENTIAL_NOT_FOUND' };
  }

  const ticker = await getTicker(exchangeId);
  const btcAmount = calcBtcAmount(ticker.ask, quoteAmount, exchangeId);
  const result = await execBuyOrder(exchangeId, credential, btcAmount);

  return result;
};

TaskManager.defineTask(FIND_ORDERS_TASK, async () => {
  const now = Date.now();

  console.log(`got background fetch call at date: ${new Date(now).toISOString()}`);

  const schedules = await loadSchedules();
  const windowedSchedules = findWindowedSchedules(now, schedules);

  for (const schedule of windowedSchedules) {
    const { exchangeId, quoteAmount } = schedule;

    console.log(`execute order: exchangeId=${exchangeId}, quoteAmount=${quoteAmount}`);

    const orderResult = await buyQuoteAmount(exchangeId, quoteAmount);

    console.log(`order result: ${JSON.stringify(orderResult)}`);

    if (orderResult.status === 'SUCCESS') {
      const nextIndex = getNextIndexFromNow(schedule, now);
      const nextAt = getNextAtByIndex(schedule, nextIndex);

      schedule.status.nextIndex = nextIndex;
      schedule.status.nextAt = nextAt;
    } else {
      schedule.status.enabled = false;
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
