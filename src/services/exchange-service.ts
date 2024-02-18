import invariant from 'tiny-invariant';
import { atomWithStorage, createJSONStorage, atomFamily, loadable } from 'jotai/utils';
import { atomWithQuery } from 'jotai-tanstack-query';
import * as SecureStore from 'expo-secure-store';
import { EXCHANGES } from '../master';
import { ExchangeMaster, ExchangeId, ExchangeCredential } from '../models';
import { getTicker, getBalance } from './exchange-api-service/universal';

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

// 取引所の認証情報を扱うAtom
export const exchangeCredentialsAtom = atomWithStorage(EXCHANGES_KEY, [], storage, { getOnInit: true });
export const loadableExchangeCredentialsAtom = loadable(exchangeCredentialsAtom);

// 各取引所のティッカー情報を取得するためのAtomFamily
export const exchangeTickerFamily = atomFamily((exchangeId: ExchangeId) => {
  return atomWithQuery(() => ({
    queryKey: ['tickers', exchangeId],
    queryFn: async () => {
      return await getTicker(exchangeId as ExchangeId);
    },
  }));
});

export const exchangeBalanceFamily = atomFamily((exchangeId: ExchangeId) => {
  return atomWithQuery((get) => {
    const loadableCredentials = get(loadableExchangeCredentialsAtom);

    if (loadableCredentials.state === 'hasData') {
      const credential = loadableCredentials.data.find((c) => c.exchangeId === exchangeId);

      if (credential) {
        return {
          queryKey: ['balances', credential.apiKey, credential.apiSecret],
          queryFn: async ({ queryKey: [, apiKey, apiSecret] }) => {
            return await getBalance({ exchangeId, apiKey, apiSecret } as ExchangeCredential);
          },
        };
      }

      return {
        queryKey: ['balances', '', ''],
        queryFn: async () => {
          return await Promise.resolve({
            JPY: null,
            BTC: null,
          });
        },
      };
    }

    return {
      queryKey: ['balances', '', ''],
      queryFn: async () => {
        return await Promise.resolve({
          JPY: null,
          BTC: null,
        });
      },
    };
  });
});

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
