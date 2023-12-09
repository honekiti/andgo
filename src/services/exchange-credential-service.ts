import * as SecureStore from 'expo-secure-store';
import { ExchangeId, ExchangeCredential } from '../models';

export const saveCredential = async (key: ExchangeId, obj: ExchangeCredential): Promise<void> => {
  await SecureStore.setItemAsync(key, JSON.stringify(obj));
};

export const loadCredential = async (key: ExchangeId): Promise<ExchangeCredential | null> => {
  if (process.env.EXPO_PUBLIC_BITBANK_API_KEY && process.env.EXPO_PUBLIC_BITBANK_API_SECRET) {
    return {
      apiKey: process.env.EXPO_PUBLIC_BITBANK_API_KEY,
      apiSecret: process.env.EXPO_PUBLIC_BITBANK_API_SECRET,
    };
  }

  const credential = await SecureStore.getItemAsync(key);
  if (!credential) {
    return null;
  }
  return JSON.parse(credential);
};
