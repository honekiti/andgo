import AsyncStorage from '@react-native-async-storage/async-storage';
import { RESET } from 'jotai/utils';
import { plansAtom } from '../services/plan-service';
import { exchangeCredentialsAtom } from '../services/exchange-service';
import { accountAtom } from '../services/account-service';
import { store } from '../store';

export const hardReset = async () => {
  await AsyncStorage.clear();

  store.set(accountAtom, RESET);
  store.set(exchangeCredentialsAtom, RESET);
  store.set(plansAtom, RESET);
};
