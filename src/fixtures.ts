import type { ExchangeCredential, Plan, Order, SuccessOrderResult } from './models';

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

export const BUY_PLANS: Plan[] = [
  {
    id: 'DEBUG_PLAN1',
    orderType: 'BUY',
    exchangeId: 'BITFLYER',
    planTypeId: 'DAILY',
    dryRun: true,
    buy: { quoteAmount: 100000 },

    status: {
      enabled: false,
      refAt: new Date(2024, 4, 1, 13, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 13, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN2',
    orderType: 'BUY',
    exchangeId: 'COINCHECK',
    planTypeId: 'WEEKLY',
    dryRun: true,
    buy: { quoteAmount: 100000 },
    status: {
      enabled: false,
      refAt: new Date(2024, 4, 1, 14, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 14, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN3',
    orderType: 'BUY',
    exchangeId: 'BITBANK',
    planTypeId: 'MONTHLY',
    dryRun: true,
    buy: { quoteAmount: 100000 },
    status: {
      enabled: false,
      refAt: new Date(2024, 4, 1, 15, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 15, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN4',
    orderType: 'BUY',
    exchangeId: 'BITFLYER',
    planTypeId: 'DAILY',
    dryRun: true,
    buy: { quoteAmount: 100000 },
    status: {
      enabled: true,
      refAt: new Date(2024, 4, 1, 16, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 16, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN5',
    orderType: 'BUY',
    exchangeId: 'COINCHECK',
    planTypeId: 'WEEKLY',
    dryRun: true,
    buy: { quoteAmount: 100000 },
    status: {
      enabled: true,
      refAt: new Date(2024, 4, 1, 17, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 17, 0).getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN6',
    orderType: 'BUY',
    exchangeId: 'BITBANK',
    planTypeId: 'MONTHLY',
    dryRun: true,
    buy: { quoteAmount: 100000 },
    status: {
      enabled: true,
      refAt: new Date(2024, 4, 1, 18, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 18, 0).getTime(),
    },
  },
];

export const INFO_PLANS: Plan[] = [
  {
    id: 'DEBUG_PLAN7',
    orderType: 'INFO',
    exchangeId: 'BITBANK',
    planTypeId: 'MONTHLY',
    dryRun: true,
    info: { thresholdAmount: 10000000 },
    status: {
      enabled: true,
      refAt: new Date(2024, 4, 1, 18, 0).getTime(),
      nextIndex: 0,
      nextAt: new Date(2024, 4, 1, 18, 0).getTime(),
    },
  },
];

export const DEBUG_PLANS: Plan[] = [...BUY_PLANS, ...INFO_PLANS];

export const BUY_ORDERS: Order[] = Array.from({ length: 10 }, (_, i) => ({
  id: `ORD_${i}`,
  orderedAt: new Date(2024, 4, 1, 0, 0).getTime() + i * 1000 * 60 * 60 * 24,
  planSnapshot: BUY_PLANS[i % BUY_PLANS.length],
  dryRun: false,
  result: {
    status: 'SUCCESS',
    btcAmount: 0.01,
  } as SuccessOrderResult,
}));

const INFO_ORDERS: Order[] = Array.from({ length: 10 }, (_, i) => ({
  id: `ORD_${BUY_ORDERS.length + i}`,
  orderedAt: new Date(2024, 4, 1, 1, 10).getTime() + i * 1000 * 60 * 60 * 24,
  planSnapshot: INFO_PLANS[i % INFO_PLANS.length],
  dryRun: false,
  result: {
    status: 'SUCCESS',
    balance: {
      BTC: 0.01,
      JPY: 10000000,
    },
  } as SuccessOrderResult,
}));

export const DEBUG_ORDERS: Order[] = [...BUY_ORDERS, ...INFO_ORDERS];
