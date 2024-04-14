// 取引所ID
export type ExchangeId = 'UNKNOWN' | 'BITBANK' | 'BITFLYER' | 'COINCHECK' | 'GMO';

// 取引所マスター
export type ExchangeMaster = {
  id: ExchangeId;
  name: string; // 取引所名
  minBtcAmt: number; // 最少購入量
  minJpyAmt: number; // 最少購入量
  orderPrecision: number; // 注文する小数点以下の桁数
};

// 取引所のクレデンシャル情報
export type ExchangeCredential = {
  exchangeId: ExchangeId;
  apiKey: string;
  apiSecret: string;
};

// 取引所のTicker情報
export type Ticker = {
  ask: number; // 現在の売り注文の最安値
};

// 取引所の残高情報
export type Balance = {
  JPY?: number;
  BTC?: number;
};

export type PlanId = string;

export type PlanTypeId = 'DAILY' | 'WEEKLY' | 'MONTHLY';

// スケジュールの繰り返し単位
export type IntervalUnit = 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS';

// スケジュール
export type Plan = {
  id: PlanId;
  exchangeId: ExchangeId; // target exchange
  quoteAmount: number; // quote amount [yen]
  planTypeId: PlanTypeId; // plan id
  dryRun: boolean; // ドライランとするか
  status: {
    enabled: boolean; // enabled or not
    refAt: number; // reference time [unix time]
    nextIndex: number; // next index
    nextAt: number; // next time [unix time]
  };
};

// プランタイプマスター
export type PlanTypeMaster = {
  id: PlanTypeId; // プランID
  name: string; // プラン名
  intervalUnit: IntervalUnit; // スケジュールの繰り返し単位
  interval: number; // 繰り返し間隔
};

export type Account = {
  // trueのとき、実際の購入は行われない
  dryRun: boolean;
  // 利用規約に同意済みのときtrueがセットされる
  agreement: boolean;
  // 購入指示数
  numOfOrders: number;
  // 累計購入BTC量
  totalBtcAmount: number;
  // 累積支払金額 [JPY]
  totalSpentAmount: number;
};

export type SuccessOrderResult = {
  status: 'SUCCESS';
  // 購入指示BTC量
  btcAmount: number;
};

export type FailedOrderResult = {
  status: 'FAILED';
  errorCode: string;
};

// 購入指示
export type OrderId = `ORD_${number}`;
export type Order<R = SuccessOrderResult | FailedOrderResult> = {
  id: OrderId; // ORD_0, ORD_1, ...
  orderedAt: number; // 注文日時 [unix time]
  planSnapshot: Plan;
  dryRun: boolean; // ドライランだったか
  result: R;
};

// 将来予定にて残高不足が予想される場合
export type MaybeFailedResult = {
  status: 'MAYBE_FAILED';
  errorCode: 'INSUFFICIENT_FUNDS';
};

export type CalendarEventId = string;

export type CalendarEvent<R = SuccessOrderResult | FailedOrderResult | MaybeFailedResult | null> = {
  id: CalendarEventId;
  orderedAt: number; // 注文日時 (過去、未来の両方)
  exchangeId: ExchangeId;
  quoteAmount: number; // yen
  result: R;
};

// CalendarEventリストを年月日で集約したもの
export type AggregatedCalendarEvent = {
  id: string;
  yearMonthDate: number;
  calendarEvents: CalendarEvent[];
  isLastOrder: boolean; // trueのとき、下に現在時刻を表示する
};
