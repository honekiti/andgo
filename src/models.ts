// 取引所ID
export type ExchangeId = 'bitbank' | 'bitflyer' | 'coincheck' | 'gmo';

// 取引所マスター
export type ExchangeMaster = {
  id: ExchangeId;
  name: string; // 取引所名
  minBtcAmt: number; // 最少購入量
  minJpyAmt: number; // 最少購入量
  viewPrecision: number; // 表示する小数点以下の桁数
  orderPrecision: number; // 注文する小数点以下の桁数
};

// 取引所のクレデンシャル情報
export type ExchangeCredential = {
  id: ExchangeId;
  apiKey: string;
  apiSecret: string;
};

// 取引所のTicker情報
export type Ticker = {
  ask: number; // 現在の売り注文の最安値
};

// スケジュールの繰り返し間隔
export type IntervalType = 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS';

// スケジュール
export type Schedule = {
  id: string; // schedule id
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
