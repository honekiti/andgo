import { atom } from 'jotai';
import invariant from 'tiny-invariant';
import { addMonths, getYear, getMonth, getDate } from 'date-fns';
import { accountAtom } from '../account-service';
import { orderFamily } from '../order-service';
import { plansAtom, getNextIndexFromNow, getNextAtByIndex } from '../plan-service';
import { logFactory } from '../../utils/logger';
import type { Plan, Order, OrderId, CalendarEvent, AggregatedCalendarEvent } from '../../models';

const logger = logFactory('calendar-service');

const MAX_ORDERS = 100;
const PLAN_EVENTS_MAX_NUM = 20;
const PLAN_EVENTS_RANGE_MONTHS = 3;

/**
 * オーダー記録をMAX_ORDERS数分、オーダー時刻の昇順で返す。
 */
export const ordersAtom = atom<Promise<Order[]>>(async (get) => {
  const account = await get(accountAtom);
  const numOfResponses = Math.min(account.numOfOrders, MAX_ORDERS);
  const startIndex = account.numOfOrders - numOfResponses;
  const orders = await Promise.all(
    Array.from({ length: numOfResponses }, async (_, i) => {
      const id = `ORD_${startIndex + i}` as OrderId;
      const res = await get(orderFamily(id));

      if (res === null) {
        logger.warn({ msg: 'Order not found', id });
      }

      return res;
    }),
  );

  // 存在しないものを取り除く
  const filtered = orders.filter((o) => o !== null) as Order[];

  return filtered;
});

export const plansToBuyOrderEvents = (plans: Plan[], now: number) => {
  const events: CalendarEvent[] = [];
  const limit = addMonths(now, PLAN_EVENTS_RANGE_MONTHS).getTime();
  const enabledPlans = plans.filter((p) => p.orderType === 'BUY' && p.status.enabled);

  // 三ヶ月先までのカレンダーイベントを取得する
  for (const plan of enabledPlans) {
    try {
      invariant(plan.buy);

      for (let nextIndex = getNextIndexFromNow(plan.planTypeId, plan.status.refAt, now); nextIndex++; ) {
        const nextAt = getNextAtByIndex(plan.planTypeId, plan.status.refAt, nextIndex);

        if (nextAt < limit) {
          events.push({
            id: `${plan.id}:${nextIndex}`,
            orderedAt: nextAt,
            exchangeId: plan.exchangeId,
            quoteAmount: plan.buy.quoteAmount,
            result: null, // TODO: 口座残高が不足する場合は、INSUFFICIENT_FUNDSにする
          });
        } else {
          break;
        }
      }
    } catch (e) {
      logger.error({ msg: 'Failed to get plan events', errMsg: (e as Error).message });
    }
  }

  return events.sort((a, b) => a.orderedAt - b.orderedAt).filter((ele, index) => index < PLAN_EVENTS_MAX_NUM);
};

/**
 * 予定する購入指示オーダーイベントについて、オーダー時刻の昇順で返す。
 */
export const futureEventsAtom = atom(async (get) => {
  const plans = await get(plansAtom);
  const now = new Date().getTime();
  const events = plansToBuyOrderEvents(plans, now);

  return events;
});

/**
 * yearMonthDateで集約する。
 *
 * @param calendarEvents
 * @returns
 */
export const aggregateEvents = (calendarEvents: CalendarEvent[], prefix: string) => {
  const results: AggregatedCalendarEvent[] = [];

  for (const e of calendarEvents) {
    const year = getYear(e.orderedAt);
    const monthIndex = getMonth(e.orderedAt);
    const date = getDate(e.orderedAt);
    const yearMonthDate = new Date(year, monthIndex, date).getTime();

    if (!(results.length > 0 && results[results.length - 1].yearMonthDate === yearMonthDate)) {
      results.push({
        id: `${prefix}:${yearMonthDate}`,
        yearMonthDate,
        calendarEvents: [],
        isLastOrder: false,
      });
    }

    results[results.length - 1].calendarEvents.push(e);
  }

  return results;
};

export const transformToBuyOrderEvents = (orders: Order[]): CalendarEvent[] => {
  return orders
    .filter((o) => o.planSnapshot.orderType === 'BUY' && !!o.planSnapshot.buy)
    .map((o) => ({
      id: `${o.id}`,
      orderedAt: o.orderedAt,
      exchangeId: o.planSnapshot.exchangeId,
      quoteAmount: o.planSnapshot.buy?.quoteAmount,
      result: o.result,
    })) as CalendarEvent[];
};

export const calendarEventsAtom = atom(async (get) => {
  const orders = await get(ordersAtom);
  const buyOrderEvents = transformToBuyOrderEvents(orders);
  const futureEvents = await get(futureEventsAtom);

  const aggregatedOrderEvents = aggregateEvents(buyOrderEvents, 'Order');
  const aggregatedFutureEvents = aggregateEvents(futureEvents, 'Future');

  if (aggregatedOrderEvents.length > 0) {
    aggregatedOrderEvents[aggregatedOrderEvents.length - 1].isLastOrder = true;
  }

  return [...aggregatedOrderEvents, ...aggregatedFutureEvents];
});
