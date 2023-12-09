export type ExchangeId = 'bitbank' | 'bitflyer' | 'coincheck' | 'gmo';
export type Exchange = {
  id: ExchangeId;
  name: string;
};

export type ExchangeCredential = {
  apiKey: string;
  apiSecret: string;
};
export const EXCHANGES = [
  {
    id: 'bitbank',
    name: 'bitbank',
    minAmt: 0.0001, // API: https://api.bitbank.cc/v1/spot/status
    viewPrecision: 4, // 表示する小数点以下の桁数
    orderPrecision: 4, // 注文する小数点以下の桁数
  },
  {
    id: 'bitflyer',
    name: 'bitFlyer',
    minAmt: 0.001,
    viewPrecision: 8, // 表示する小数点以下の桁数
    orderPrecision: 3, // 注文する小数点以下の桁数
  },
  {
    id: 'coincheck',
    name: 'Coincheck',
    minAmt: 0.005, // written in API response
    viewPrecision: 8, // 表示する小数点以下の桁数
    orderPrecision: 3, // 注文する小数点以下の桁数
  },
  {
    id: 'gmo',
    name: 'GMOコイン',
    minAmt: 0.0001,
    viewPrecision: 8, // 表示する小数点以下の桁数
    orderPrecision: 4, // 注文する小数点以下の桁数
  },
];

export type IntervalType = 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS';

export type Schedule = {
  exchangeId: ExchangeId; // target exchange
  quoteAmount: number; // quote amount [yen]
  intervalType: IntervalType; // interval type
  interval: number; // interval [minutes]
  status: {
    enabled: boolean; // enabled or not
    refAt: number; // reference time [unix time]
    nextIndex: number; // next index
    nextAt: number; // next time [unix time]
  };
};

export type Ticker = {
  ask: number; // 現在の売り注文の最安値
};
