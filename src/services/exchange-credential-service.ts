import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import * as SecureStore from 'expo-secure-store';
import { ExchangeCredential } from '../models';

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

// export const saveCredentials = async (credentials: ExchangeCredential[]): Promise<void> => {
//   await SecureStore.setItemAsync(EXCHANGES_KEY, JSON.stringify(credentials));
// };

// export const loadCredentials = async (): Promise<ExchangeCredential[]> => {
//   const credentials = await SecureStore.getItemAsync(EXCHANGES_KEY);
//   if (!credentials) {
//     return [];
//   }
//   return JSON.parse(credentials);
// };
