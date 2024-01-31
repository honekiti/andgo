import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, addHours, addMinutes, addMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths } from 'date-fns';
import { IntervalType, Schedule } from '../models';

const SCHEDULES_KEY = 'SCHEDULES_KEY';
const ADD_FUNC = {
  MINUTES: addMinutes,
  HOURS: addHours,
  DAYS: addDays,
  MONTHS: addMonths,
} satisfies Record<IntervalType, (date: Date, amount: number) => Date>;
const DIFF_FUNC = {
  MINUTES: differenceInMinutes,
  HOURS: differenceInHours,
  DAYS: differenceInDays,
  MONTHS: differenceInMonths,
} satisfies Record<IntervalType, (dateLeft: Date, dateRight: Date) => number>;

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
    intervalType,
    interval,
    status: { refAt },
  } = schedule;

  return refAt < now ? Math.floor(DIFF_FUNC[intervalType](now, refAt) / interval) + 1 : 0;
};

export const getNextAtByIndex = (schedule: Schedule, nextIndex: number): number => {
  const {
    intervalType,
    interval,
    status: { refAt },
  } = schedule;

  return ADD_FUNC[intervalType](refAt, interval * nextIndex).getTime();
};
