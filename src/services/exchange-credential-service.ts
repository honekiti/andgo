import * as SecureStore from 'expo-secure-store';
import { ExchangeId, ExchangeCredential } from '../models';

const EXCHANGES_KEY = 'EXCHANGES_KEY';

export const saveCredentials = async (credentials: ExchangeCredential[]): Promise<void> => {
  await SecureStore.setItemAsync(EXCHANGES_KEY, JSON.stringify(credentials));
};

export const loadCredentials = async (): Promise<ExchangeCredential[]> => {
  const credentials = await SecureStore.getItemAsync(EXCHANGES_KEY);
  if (!credentials) {
    return [];
  }
  return JSON.parse(credentials);
};
