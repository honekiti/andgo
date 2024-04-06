import { aggregateEvents } from './calendar-service';
import { DEBUG_ORDER_EVENTS } from '../fixtures';

describe('aggregateEvents', () => {
  test('success case', () => {
    const actual = aggregateEvents(DEBUG_ORDER_EVENTS);

    console.log(actual);

    expect(actual).toEqual([
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1714489200000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1714575600000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1714662000000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1714748400000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1714834800000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1714921200000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1715007600000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1715094000000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1715180400000,
      },
      {
        calendarEvents: [
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
        ],
        isLastOrder: false,
        yearMonthDate: 1715266800000,
      },
    ]);
  });
});
