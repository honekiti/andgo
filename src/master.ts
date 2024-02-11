import { ExchangeMaster, PlanTypeMaster } from './models';

export const VIEW_PRECISION = 8;

export const EXCHANGES: ExchangeMaster[] = [
  {
    // reference: https://bitbank.cc/docs/pairs/
    id: 'UNKNOWN',
    name: '未選択',
    minBtcAmt: 0.0001,
    minJpyAmt: 1,
    orderPrecision: 4,
  },
  {
    // reference: https://bitbank.cc/docs/pairs/
    id: 'BITBANK',
    name: 'bitbank',
    minBtcAmt: 0.0001,
    minJpyAmt: 1,
    orderPrecision: 4,
  },
  {
    // reference: https://bitflyer.com/ja-jp/faq/4-27
    id: 'BITFLYER',
    name: 'bitFlyer',
    minBtcAmt: 0.001,
    minJpyAmt: 1,
    orderPrecision: 3,
  },
  {
    // reference: https://faq.coincheck.com/s/article/40218?language=ja
    id: 'COINCHECK',
    name: 'Coincheck',
    minBtcAmt: 0.005,
    minJpyAmt: 500,
    orderPrecision: 3,
  },
  {
    // https://coin.z.com/jp/corp/product/info/exchange/
    id: 'GMO',
    name: 'GMOコイン',
    minBtcAmt: 0.0001,
    minJpyAmt: 1,
    orderPrecision: 4,
  },
];

export const PLAN_TYPES: PlanTypeMaster[] = [
  {
    id: 'DAILY',
    name: '毎日',
    intervalUnit: 'DAYS',
    interval: 1,
  },
  {
    id: 'WEEKLY',
    name: '毎週',
    intervalUnit: 'DAYS',
    interval: 7,
  },
  {
    id: 'MONTHLY',
    name: '毎月',
    intervalUnit: 'MONTHS',
    interval: 1,
  },
];

export const DAY_OF_WEEK_OPTIONS = [
  { value: 0, label: '日曜日', shortLabel: '日' },
  { value: 1, label: '月曜日', shortLabel: '月' },
  { value: 2, label: '火曜日', shortLabel: '火' },
  { value: 3, label: '水曜日', shortLabel: '水' },
  { value: 4, label: '木曜日', shortLabel: '木' },
  { value: 5, label: '金曜日', shortLabel: '金' },
  { value: 6, label: '土曜日', shortLabel: '土' },
];

export const REF_AT_MINUTE_DELTA = 15;

// e.g. [{ label: '1日', value: 1 }, { label: '2日', value: 2 }, ...]
export const DATE_OPTIONS = [...Array(28).keys()].map((i) => ({
  label: `${i}日`,
  value: i + 1,
}));

// e.g. [{ label: '0時', value: 0 }, { label: '1時', value: 1 }, ...]
export const HOUR_OPTIONS = [...Array(24).keys()].map((i) => ({
  label: `${i}時`,
  value: i,
}));

// e.g. [{ label: '0分', value: 0 }, { label: '5分', value: 5 }, ...]
export const MINUTE_OPTIONS = [...Array(60 / REF_AT_MINUTE_DELTA).keys()]
  .map((i) => i * REF_AT_MINUTE_DELTA)
  .map((i) => ({
    label: `${i}分`,
    value: i,
  }));
