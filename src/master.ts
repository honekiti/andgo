import { ExchangeMaster } from './models';

export const EXCHANGES: ExchangeMaster[] = [
  {
    // reference: https://bitbank.cc/docs/pairs/
    id: 'bitbank',
    name: 'bitbank',
    minBtcAmt: 0.0001,
    minJpyAmt: 1,
    viewPrecision: 4,
    orderPrecision: 4,
  },
  {
    // reference: https://bitflyer.com/ja-jp/faq/4-27
    id: 'bitflyer',
    name: 'bitFlyer',
    minBtcAmt: 0.001,
    minJpyAmt: 1,
    viewPrecision: 8,
    orderPrecision: 3,
  },
  {
    // reference: https://faq.coincheck.com/s/article/40218?language=ja
    id: 'coincheck',
    name: 'Coincheck',
    minBtcAmt: 0.005,
    minJpyAmt: 500,
    viewPrecision: 8,
    orderPrecision: 3,
  },
  {
    // https://coin.z.com/jp/corp/product/info/exchange/
    id: 'gmo',
    name: 'GMOコイン',
    minBtcAmt: 0.0001,
    minJpyAmt: 1,
    viewPrecision: 8,
    orderPrecision: 4,
  },
];
