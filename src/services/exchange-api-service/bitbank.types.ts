// References:
// - https://github.com/bitbankinc/node-bitbankcc/blob/master/src/lib/requestType.ts
// - https://github.com/bitbankinc/node-bitbankcc/blob/master/src/lib/responseType.ts#L54

export type BitbankResponse<T> = {
  success: number;
  data: T;
};

export type Ticker = {
  sell: string; // 現在の売り注文の最安値
  buy: string; // 現在の買い注文の最高値,
  last: string; // 最新取引価格
  timestamp: number; // 日時 (UnixTimeのミリ秒)
};

export type OrderRequest = {
  pair: string;
  amount: string;
  price?: number | string;
  side: string;
  type: string;
  post_only?: boolean;
  trigger_price?: number | string;
};

export type OrderResponse = {
  order_id: number;
  pair: string;
  side: string;
  type: string;
  start_amount: string;
  remaining_amount: string;
  executed_amount: string;
  price?: string;
  post_only?: boolean;
  average_price: string;
  ordered_at: number;
  expire_at: number;
  triggered_at?: number;
  trigger_price?: string;
  status: string;
};

export type Asset = {
  asset: string;
  amount_precision: number;
  onhand_amount: string;
  locked_amount: string;
  free_amount: string;
  stop_deposit: boolean;
  stop_withdrawal: boolean;
  withdrawal_fee:
    | {
        min: string;
        max: string;
      } // for fiat.
    | {
        under: string;
        over: string;
        threshold: string;
      }; // for cryptocurrencies.

  // only for cryptocurrencies.
  network_list?: {
    asset: string;
    network: string;
    stop_deposit: boolean;
    stop_withdrawal: boolean;
    withdrawal_fee: string;
  }[];
};

export type AssetsResponse = {
  assets: Asset[];
};
