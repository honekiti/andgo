export type Ticker = {
  last: number; // 最後の取引の価格
  bid: number; // 現在の買い注文の最高価格
  ask: number; // 現在の売り注文の最安価格
  high: number; // 24時間での最高取引価格
  low: number; // 24時間での最安取引価格
  volume: number; // 24時間での取引量
  timestamp: number; // 現在の時刻 -> ex)1423377841
};

export type OrderRequest = {
  market_buy_amount: string; // 成行買で利用する日本円の金額
  order_type: string;
  pair: string;
};

export type OrderResponse = {
  success: boolean;
  id: string; // 新規注文のID
  rate: number;
  amount: number;
  order_type: string;
  time_in_force: string; // 注文有効期間
  stop_loss_rate: string; // 逆指値レート
  pair: string;
  created_at: string; // 注文の作成日時
};

export type BalanceElement = {
  success: boolean;
  jpy: number;
  btc: number;
  jpy_reserved: number;
  btc_reserved: number;
  jpy_lend_in_use: number;
  btc_lend_in_use: number;
  jpy_lent: number;
  btc_lent: number;
  jpy_debt: number;
  btc_debt: number;
  jpy_tsumitate: number;
  btc_tsumitate: number;
};

export type GetBalanceResponse = BalanceElement[];
