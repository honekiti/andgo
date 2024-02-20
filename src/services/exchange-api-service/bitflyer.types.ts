// References:
// - https://lightning.bitflyer.com/docs?lang=ja

export type Ticker = {
  product_code: string;
  state: string;
  timestamp: string;
  tick_id: number;
  best_bid: number;
  best_ask: number;
  best_bid_size: number;
  best_ask_size: number;
  total_bid_depth: number;
  total_ask_depth: number;
  market_bid_size: number;
  market_ask_size: number;
  ltp: number;
  volume: number;
  volume_by_product: number;
};

export type SendChildOrderRequest = {
  product_code: string;
  child_order_type: string;
  side: string;
  price: number;
  size: number;
  minute_to_expire: number;
  time_in_force: string;
};

export type SendChildOrderResponse = {
  child_order_acceptance_id: string;
};

export type BalanceElement = {
  currency_code: string;
  amount: number;
  available: number;
};

export type GetBalanceResponse = BalanceElement[];
