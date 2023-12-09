import AsyncStorage from '@react-native-async-storage/async-storage';
import { Schedule } from '../models';

const SCHEDULES_KEY = 'SCHEDULES_KEY_KEY';

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
