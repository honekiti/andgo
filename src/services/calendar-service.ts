import { atom } from 'jotai';
import { addMonths, getYear, getMonth, getDate } from 'date-fns';
import { accountAtom } from './account-service';
import { orderFamily } from './order-service';
import { plansAtom, getNextIndexFromNow, getNextAtByIndex } from './plan-service';
import type { Order, OrderId, CalendarEvent, AggregatedCalendarEvent } from '../models';

const MAX_ORDERS = 100;
const RANGE_MONTHS = 3;

/**
 * オーダー記録をMAX_ORDERS数分、オーダー時刻の昇順で返す。
 */
export const ordersAtom = atom(async (get) => {
  const account = await get(accountAtom);
  const numOfResponses = Math.min(account.numOfOrders, MAX_ORDERS);
  const startIndex = account.numOfOrders - numOfResponses;
  const orders = await Promise.all(
    Array.from({ length: numOfResponses }, async (_, i) => {
      const id = `ORD_${startIndex + i}` as OrderId;
      const res = await get(orderFamily(id));

      if (res === null) {
        console.warn(`Order not found: ${id}`);
      }

      return res;
    }),
  );

  // 存在しないものを取り除く
  const filtered = orders.filter((o) => o !== null) as Order[];

  return filtered;
});

/**
 * 予定するオーダーイベントについて、オーダー時刻の昇順で返す。
 */
export const futureEventsAtom = atom(async (get) => {
  const plans = await get(plansAtom);
  const now = new Date().getTime();
  const limit = addMonths(now, RANGE_MONTHS).getTime();
  const events: CalendarEvent[] = [];

  // 三ヶ月先までのカレンダーイベントを取得する
  for (const plan of plans) {
    for (let nextIndex = getNextIndexFromNow(plan.planTypeId, plan.status.refAt, now); nextIndex++; ) {
      const nextAt = getNextAtByIndex(plan.planTypeId, plan.status.refAt, nextIndex);

      if (nextAt < limit) {
        events.push({
          id: `${plan.id}:${nextIndex}`,
          orderedAt: nextAt,
          exchangeId: plan.exchangeId,
          quoteAmount: plan.quoteAmount,
          result: null, // TODO: 口座残高が不足する場合は、INSUFFICIENT_FUNDSにする
        });
      } else {
        break;
      }
    }
  }

  return events.sort((a, b) => a.orderedAt - b.orderedAt);
});

/**
 * yearMonthDateで集約する。
 *
 * @param calendarEvents
 * @returns
 */
export const aggregateEvents = (calendarEvents: CalendarEvent[]) => {
  const results: AggregatedCalendarEvent[] = [];

  for (const e of calendarEvents) {
    const year = getYear(e.orderedAt);
    const monthIndex = getMonth(e.orderedAt);
    const date = getDate(e.orderedAt);
    const yearMonthDate = new Date(year, monthIndex, date).getTime();

    if (!(results.length > 0 && results[results.length - 1].yearMonthDate === yearMonthDate)) {
      results.push({
        yearMonthDate,
        calendarEvents: [],
        isLastOrder: false,
      });
    }

    results[results.length - 1].calendarEvents.push(e);
  }

  return results;
};

export const calendarEventsAtom = atom(async (get) => {
  const orders = await get(ordersAtom);
  const orderEvents: CalendarEvent[] = orders.map((o) => ({
    id: `${o.id}`,
    orderedAt: o.orderedAt,
    exchangeId: o.planSnapshot.exchangeId,
    quoteAmount: o.planSnapshot.quoteAmount,
    result: o.result,
  }));
  const futureEvents = await get(futureEventsAtom);

  const aggregatedOrderEvents = aggregateEvents(orderEvents);
  const aggregatedFutureEvents = aggregateEvents(futureEvents);

  if (aggregatedOrderEvents.length > 0) {
    aggregatedOrderEvents[aggregatedOrderEvents.length - 1].isLastOrder = true;
  }

  return [...aggregatedOrderEvents, ...aggregatedFutureEvents];
});
