import invariant from 'tiny-invariant';
import { setHours, setMinutes, setDay, setDate, getDate, getDay } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, addHours, addMinutes, addMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths } from 'date-fns';
import { EXCHANGES, PLANS, REF_AT_MINUTE_DELTA } from '../master';
import { ExchangeCredential, IntervalUnit, Schedule } from '../models';
import type { PlanId } from '../models';

const SCHEDULES_KEY = 'SCHEDULES_KEY';
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

export const saveScheduels = async (schedules: Schedule[]) => {
  await AsyncStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
};

export const loadSchedules = async (): Promise<Schedule[]> => {
  const schedules = await AsyncStorage.getItem(SCHEDULES_KEY);
  if (!schedules) {
    return [];
  }
  return JSON.parse(schedules);
};

export const getNextIndexFromNow = (schedule: Schedule, now: number): number => {
  const {
    intervalUnit,
    interval,
    status: { refAt },
  } = schedule;

  return refAt < now ? Math.floor(DIFF_FUNC[intervalUnit](now, refAt) / interval) + 1 : 0;
};

export const getNextAtByIndex = (schedule: Schedule, nextIndex: number): number => {
  const {
    intervalUnit,
    interval,
    status: { refAt },
  } = schedule;

  return ADD_FUNC[intervalUnit](refAt, interval * nextIndex).getTime();
};

export const getExchangeName = (credential: ExchangeCredential) => {
  const found = EXCHANGES.find((ex) => ex.id === credential.id);

  invariant(found, `Exchange not found: ${credential.id}`);

  return found.name;
};

export const getPlan = (planId: PlanId) => {
  const found = PLANS.find((p) => p.id === planId);

  invariant(found, `Plan not found: ${planId}`);

  return found;
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
