// References:
// - https://api.coin.z.com/docs/#outline

export type Ticker = {
  ask: string;
  bid: string;
  high: string;
  low: string;
  last: string;
  symbol: 'BTC';
  timestamp: string;
  volume: string;
};

export type OrderRequest = {
  symbol: 'BTC';
  side: string;
  executionType: string;
  size: string;
};

export type OrderResponse = {
  data: string;
};

export type Asset = {
  amount: string;
  available: string;
  conversionRate: string;
  symbol: 'BTC';
};

export type AssetsResponse = Asset[];

export type GMOResponse = {
  status: number;
  data: Ticker;
  responsetime: string;
};
