export type Ticker = {
  last: number; // 最後の取引の価格
  bid: number; // 現在の買い注文の最高価格
  ask: number; // 現在の売り注文の最安価格
  high: number; // 24時間での最高取引価格
  low: number; // 24時間での最安取引価格
  volume: string; // 24時間での取引量
  timestamp: number; // 現在の時刻 -> ex)1423377841
};

export type OrderRequest = {
  market_buy_amount: string; // 成行買で利用する日本円の金額
  order_type: 'market_buy';
  pair: 'btc_jpy';
};

export type OrderResponse = {
  success: boolean;
  id: number; // 新規注文のID
  rate: string;
  amount: string;
  order_type: 'market_buy';
  time_in_force?: string; // 注文有効期間
  stop_loss_rate: string | null; // 逆指値レート
  pair: 'btc_jpy';
  created_at: string; // 注文の作成日時
};

export type GetBalanceResponse = {
  success: boolean;
  jpy: string;
  btc: string;
  jpy_reserved: string;
  btc_reserved: string;
  jpy_lend_in_use: string;
  btc_lend_in_use: string;
  jpy_lent: string;
  btc_lent: string;
  jpy_debt: string;
  btc_debt: string;
  jpy_tsumitate: string;
  btc_tsumitate: string;
};
