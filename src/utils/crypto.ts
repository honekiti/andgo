import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex as toHex } from '@noble/hashes/utils';
import * as Crypto from 'expo-crypto';

export const hmacSha256 = (key: string, data: string): string => {
  const mac = hmac(sha256, key, data);

  return toHex(mac);
};

export const genId = () => {
  return Crypto.randomUUID();
};
