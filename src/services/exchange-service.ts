import invariant from 'tiny-invariant';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import * as SecureStore from 'expo-secure-store';
import { EXCHANGES } from '../master';
import { ExchangeMaster, ExchangeId, ExchangeCredential } from '../models';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class CommonSecureStore {
  static async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }
  static async getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }
  static async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}

const EXCHANGES_KEY = 'EXCHANGES_KEY';
const storage = createJSONStorage<ExchangeCredential[]>(() => CommonSecureStore);
export const exchangeCredentialsAtom = atomWithStorage(EXCHANGES_KEY, [], storage, { getOnInit: true });

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
