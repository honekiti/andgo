import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import invariant from 'tiny-invariant';
import { setHours, setMinutes, setDay, setDate, getDate, getDay, getHours, getMinutes } from 'date-fns';
import { addDays, addHours, addMinutes, addMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths } from 'date-fns';
import { EXCHANGES, PLAN_TYPES, REF_AT_MINUTE_DELTA } from '../master';
import { ExchangeMaster, ExchangeId, ExchangeCredential, IntervalUnit, Plan } from '../models';
import type { PlanTypeId } from '../models';

const PLANS_KEY = 'PLANS_KEY';
const ADD_FUNC = {
  MINUTES: addMinutes,
  HOURS: addHours,
  DAYS: addDays,
  MONTHS: addMonths,
} satisfies Record<IntervalUnit, (date: Date, amount: number) => Date>;
const DIFF_FUNC = {
  MINUTES: differenceInMinutes,
  HOURS: differenceInHours,
  DAYS: differenceInDays,
  MONTHS: differenceInMonths,
} satisfies Record<IntervalUnit, (dateLeft: Date, dateRight: Date) => number>;

const storage = createJSONStorage<Plan[]>(() => AsyncStorage);
export const plansAtom = atomWithStorage(PLANS_KEY, [], storage, { getOnInit: true });

// export const savePlans = async (plans: Plan[]) => {
//   await AsyncStorage.setItem(PLANS_KEY, JSON.stringify(plans));
// };

// export const loadPlans = async (): Promise<Plan[]> => {
//   const plans = await AsyncStorage.getItem(PLANS_KEY);
//   if (!plans) {
//     return [];
//   }
//   return JSON.parse(plans);
// };

export const getNextIndexFromNow = (plan: Plan, now: number): number => {
  const {
    planTypeId,
    status: { refAt },
  } = plan;
  const { intervalUnit, interval } = getPlanType(planTypeId);
  return refAt < now ? Math.floor(DIFF_FUNC[intervalUnit](now, refAt) / interval) + 1 : 0;
};

export const getNextAtByIndex = (plan: Plan, nextIndex: number): number => {
  const {
    planTypeId,
    status: { refAt },
  } = plan;
  const { intervalUnit, interval } = getPlanType(planTypeId);

  return ADD_FUNC[intervalUnit](refAt, interval * nextIndex).getTime();
};

export const getExchange = (exchangeId: ExchangeId): ExchangeMaster => {
  const found = EXCHANGES.find((ex) => ex.id === exchangeId);

  invariant(found, `Exchange not found: ${exchangeId}`);

  return found;
};

export const getExchangeFromCredential = (credential: ExchangeCredential): ExchangeMaster => {
  const found = EXCHANGES.find((ex) => ex.id === credential.exchangeId);

  invariant(found, `Exchange not found: ${credential.exchangeId}`);

  return found;
};

export const getPlanType = (planTypeId: PlanTypeId) => {
  const found = PLAN_TYPES.find((p) => p.id === planTypeId);

  invariant(found, `Plan type not found: ${planTypeId}`);

  return found;
};

export const getRefAtDetails = (plan: Plan): { dayOfWeek: number; date: number; hour: number; minute: number } => {
  const { refAt } = plan.status;
  return {
    dayOfWeek: getDay(refAt),
    date: getDate(refAt),
    hour: getHours(refAt),
    minute: getMinutes(refAt),
  };
};

/**
 * 指定した日にち, 曜日, 時間, 分で参照時刻を調整する.
 * 分は15分単位で切り上げ調整する.
 */
export const getModifiedRefAt = (options: { refAt: number; date?: number; dayOfWeek?: number; hours: number; minutes: number }) => {
  const { refAt, date, dayOfWeek, hours, minutes } = options;

  return [refAt]
    .map((v) => setDate(v, date ?? getDate(refAt))) // 日にち
    .map((v) => setDay(v, dayOfWeek ?? getDay(refAt))) // 曜日
    .map((v) => setHours(v, hours))
    .map((v) => setMinutes(v, minutes % REF_AT_MINUTE_DELTA === 0 ? minutes : minutes - (minutes % REF_AT_MINUTE_DELTA) + REF_AT_MINUTE_DELTA))[0]
    .getTime();
};
