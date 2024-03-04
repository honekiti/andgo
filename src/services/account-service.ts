import { atomWithStorage, createJSONStorage, loadable } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_ACCOUNT_VALUE } from '../master';
import type { Account } from '../models';

const ACCOUNT_KEY = 'ACCOUNT_KEY';
const storage = createJSONStorage<Account>(() => AsyncStorage);
export const accountAtom = atomWithStorage(ACCOUNT_KEY, DEFAULT_ACCOUNT_VALUE, storage, { getOnInit: true });
export const loadableAccountAtom = loadable(accountAtom);
