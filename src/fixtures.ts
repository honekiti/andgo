import type { ExchangeCredential, Plan, Order, CalendarEvent } from './models';

export const DEBUG_CREDENTIALS: ExchangeCredential[] = [
  {
    exchangeId: 'BITFLYER',
    apiKey: 'DEBUG_API_KEY',
    apiSecret: 'DEBUG_API_SECRET',
  },
  {
    exchangeId: 'COINCHECK',
    apiKey: 'DEBUG_API_KEY',
    apiSecret: 'DEBUG_API_SECRET',
  },
  {
    exchangeId: 'BITBANK',
    apiKey: 'DEBUG_API_KEY',
    apiSecret: 'DEBUG_API_SECRET',
  },
];

export const DEBUG_PLANS: Plan[] = [
  {
    id: 'DEBUG_PLAN1',
    exchangeId: 'BITFLYER',
    quoteAmount: 100000,
    planTypeId: 'DAILY',
    status: {
      enabled: false,
      refAt: new Date(2024, 4, 1, 13, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 13, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN2',
    exchangeId: 'COINCHECK',
    quoteAmount: 100000,
    planTypeId: 'WEEKLY',
    status: {
      enabled: false,
      refAt: new Date(2024, 4, 1, 14, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 14, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN3',
    exchangeId: 'BITBANK',
    quoteAmount: 100000,
    planTypeId: 'MONTHLY',
    status: {
      enabled: false,
      refAt: new Date(2024, 4, 1, 15, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 15, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN4',
    exchangeId: 'BITFLYER',
    quoteAmount: 100000,
    planTypeId: 'DAILY',
    status: {
      enabled: true,
      refAt: new Date(2024, 4, 1, 16, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 16, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN5',
    exchangeId: 'COINCHECK',
    quoteAmount: 50000000,
    planTypeId: 'WEEKLY',
    status: {
      enabled: true,
      refAt: new Date(2024, 4, 1, 17, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 17, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN6',
    exchangeId: 'BITBANK',
    quoteAmount: 100000,
    planTypeId: 'MONTHLY',
    status: {
      enabled: true,
      refAt: new Date(2024, 4, 1, 18, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 18, 0).getTime(),
    },
  },
];

export const DEBUG_ORDERS: Order[] = Array.from({ length: 10 }, (_, i) => ({
  id: `ORD_${i}`,
  orderedAt: new Date(2024, 4, 1, 0, 0).getTime() + i * 1000 * 60 * 60 * 24,
  planSnapshot: DEBUG_PLANS[i % DEBUG_PLANS.length],
  result: {
    status: 'SUCCESS',
    btcAmount: 0.01,
  },
}));

export const DEBUG_ORDER_EVENTS: CalendarEvent[] = DEBUG_ORDERS.map((o) => ({
  id: `${o.id}`,
  orderedAt: o.orderedAt,
  exchangeId: o.planSnapshot.exchangeId,
  quoteAmount: o.planSnapshot.quoteAmount,
  result: o.result,
}));
