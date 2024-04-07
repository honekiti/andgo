import invariant from 'tiny-invariant';
import { useAtomValue } from 'jotai';
import { atomWithStorage, createJSONStorage, atomFamily, unwrap } from 'jotai/utils';
import { atomWithQuery } from 'jotai-tanstack-query';
import * as SecureStore from 'expo-secure-store';
import { EXCHANGES } from '../master';
import type { ExchangeMaster, ExchangeId, ExchangeCredential, Balance } from '../models';
import { getTicker, getBalance } from './exchange-api-service/universal';

export const BTC_PRECISION = 8;

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

// 各取引所のティッカー情報を取得するためのAtomFamily
export const exchangeTickerFamily = atomFamily((exchangeId: ExchangeId) => {
  return atomWithQuery(() => ({
    queryKey: ['tickers', exchangeId],
    queryFn: async () => {
      return await getTicker(exchangeId as ExchangeId);
    },
    retry: false,
  }));
});

export const exchangeBalanceFamily = atomFamily((exchangeId: ExchangeId) => {
  return atomWithQuery((get) => {
    const credentials = get(unwrap(exchangeCredentialsAtom, (prev) => prev ?? []));

    if (credentials.length > 0) {
      const credential = credentials.find((c) => c.exchangeId === exchangeId);

      if (credential) {
        return {
          queryKey: ['balances', exchangeId, credential.apiKey, credential.apiSecret],
          queryFn: async ({ queryKey: [, exchangeId, apiKey, apiSecret] }) => {
            return await getBalance({ exchangeId, apiKey, apiSecret } as ExchangeCredential);
          },
          retry: false,
        };
      }

      return {
        queryKey: ['balances', '', '', ''],
        queryFn: async () => {
          return await Promise.resolve({} as Balance);
        },
      };
    }

    return {
      queryKey: ['balances', '', '', ''],
      queryFn: async () => {
        return await Promise.resolve({} as Balance);
      },
    };
  });
});

// 参考取得量を取得するためのhook.
export const useRefBtcAmount = (
  exchangeId: ExchangeId,
  quoteAmount: number,
): {
  // 参考購入BTC量 (購入予定額 / BTC/JPYレート)
  refBtcAmountStr?: string;
  // 桁調整用のゼロ文字列
  extraZerosStr?: string;
  // ステータス
  status: // 値を取得済み
    | 'FETCHED'
    // 取得中
    | 'FETCHING'
    // 取得エラー
    | 'FETCH_ERROR'
    // 最少購入量エラー
    | 'MIN_BTC_AMT_ERROR';
} => {
  const master = getExchange(exchangeId);
  // BTC/JPYレートを取得（非同期）
  const exchangeTicker = useAtomValue(exchangeTickerFamily(exchangeId));
  const exchangeBtcJpyRate = exchangeTicker.data?.ask;

  if (exchangeBtcJpyRate === undefined) {
    if (exchangeTicker.isFetching) {
      return { status: 'FETCHING' };
    }

    return { status: 'FETCH_ERROR' };
  }

  const rawBtcAmountPrice = quoteAmount / exchangeBtcJpyRate;

  // 最低購入量の確認
  if (rawBtcAmountPrice < master.minBtcAmt) {
    return { status: 'MIN_BTC_AMT_ERROR' };
  }

  // 購入粒度調整
  const refBtcAmountStr = rawBtcAmountPrice.toFixed(master.orderPrecision);
  const extraZerosStr = '0'.repeat(BTC_PRECISION - master.orderPrecision);

  return { refBtcAmountStr, extraZerosStr, status: 'FETCHED' };
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

export const getOrderPrecision = (exchangeId: ExchangeId) => {
  const found = EXCHANGES.find((ex) => ex.id === exchangeId);

  invariant(found, `Exchange not found: ${exchangeId}`);

  return found.orderPrecision;
};
