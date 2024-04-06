import { aggregateEvents, ordersToEvents, plansToEvents } from './calendar-service';
import { DEBUG_ORDERS, DEBUG_PLANS } from '../fixtures';
import { uniq } from '../utils/array';

describe('ordersToEvents', () => {
  test('success case', () => {
    const events = ordersToEvents(DEBUG_ORDERS);

    expect(events).toEqual([
      {
        exchangeId: 'BITFLYER',
        id: 'ORD_0',
        orderedAt: 1714489200000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'COINCHECK',
        id: 'ORD_1',
        orderedAt: 1714575600000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'BITBANK',
        id: 'ORD_2',
        orderedAt: 1714662000000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'BITFLYER',
        id: 'ORD_3',
        orderedAt: 1714748400000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'COINCHECK',
        id: 'ORD_4',
        orderedAt: 1714834800000,
        quoteAmount: 50000000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'BITBANK',
        id: 'ORD_5',
        orderedAt: 1714921200000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'BITFLYER',
        id: 'ORD_6',
        orderedAt: 1715007600000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'COINCHECK',
        id: 'ORD_7',
        orderedAt: 1715094000000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'BITBANK',
        id: 'ORD_8',
        orderedAt: 1715180400000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
      {
        exchangeId: 'BITFLYER',
        id: 'ORD_9',
        orderedAt: 1715266800000,
        quoteAmount: 100000,
        result: {
          btcAmount: 0.01,
          status: 'SUCCESS',
        },
      },
    ]);
  });
});

describe('plansToEvents', () => {
  test('success case', () => {
    const now = new Date(2024, 4, 10, 0, 0).getTime();
    const events = plansToEvents(
      [
        {
          id: 'DEBUG_PLAN3',
          exchangeId: 'BITBANK',
          quoteAmount: 100000,
          planTypeId: 'MONTHLY',
          status: {
            enabled: true,
            refAt: new Date(2024, 4, 1, 15, 0).getTime(),
            nextIndex: 0,
            nextAt: new Date(2024, 4, 1, 15, 0).getTime(),
          },
        },
      ],
      now,
    );

    expect(events).toEqual([
      {
        exchangeId: 'BITBANK',
        id: 'DEBUG_PLAN3:2',
        orderedAt: 1719813600000,
        quoteAmount: 100000,
        result: null,
      },
      {
        exchangeId: 'BITBANK',
        id: 'DEBUG_PLAN3:3',
        orderedAt: 1722492000000,
        quoteAmount: 100000,
        result: null,
      },
    ]);
  });
});

describe('aggregateEvents', () => {
  test('DEBUG_ORDERS', () => {
    const events = ordersToEvents(DEBUG_ORDERS);
    const result = aggregateEvents(events, 'Order');
    const keys = result.map((ele) => ele.yearMonthDate);
    const uniqued = uniq(keys);

    expect(keys.length).toBe(uniqued.length);
  });

  test('DEBUG_PLANS', () => {
    const now = new Date(2024, 4, 10, 0, 0).getTime();
    const events = plansToEvents(DEBUG_PLANS, now);
    const result = aggregateEvents(events, 'Future');
    const keys = result.map((ele) => ele.id);
    const uniqued = uniq(keys);

    expect(keys.length).toBe(uniqued.length);
  });

  test('DEBUG_ORDERS + DEBUG_PLANS', () => {
    const now = new Date(2024, 4, 10, 0, 0).getTime();
    const result1 = aggregateEvents(ordersToEvents(DEBUG_ORDERS), 'Order');
    const result2 = aggregateEvents(plansToEvents(DEBUG_PLANS, now), 'Future');
    const result = [...result1, ...result2];
    const keys = result.map((ele) => ele.id);
    const uniqued = uniq(keys);

    expect(keys.length).toBe(uniqued.length);
  });
});
