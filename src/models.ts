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
  { id: 'bitbank', name: 'bitbank' },
  { id: 'bitflyer', name: 'bitFlyer' },
  { id: 'coincheck', name: 'Coincheck' },
  { id: 'gmo', name: 'GMOコイン' },
];

export type Schedule = {
  exchangeId: ExchangeId; // target exchange
  quoteAmount: number; // quote amount [yen]
  interval: number; // interval [minutes]
  status: {
    enabled: boolean; // enabled or not
    refAt: number; // reference time [unix time]
    nextIndex: number; // next index
    nextAt: number; // next time [unix time]
  };
};
