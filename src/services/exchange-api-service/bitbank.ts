import * as querystring from 'querystring';
import { BaseApi } from './base-api';
import { hmacSha256 } from '../../utils/crypto';
import { ExchangeCredential } from '../../models';
import { BitbankResponse, Ticker, OrderRequest, OrderResponse, AssetsResponse } from './bitbank.types';

const PUBLIC_ENDPOINT = 'https://public.bitbank.cc';
const PRIVATE_ENDPOINT = 'https://api.bitbank.cc/v1';

export class Bitbank extends BaseApi {
  private readonly exchangeCredential: ExchangeCredential;
  private nonce: number;

  constructor(exchangeCredential: ExchangeCredential) {
    super(PRIVATE_ENDPOINT);

    this.exchangeCredential = exchangeCredential;
    this.nonce = new Date().getTime();
  }

  public getAssets(): Promise<BitbankResponse<AssetsResponse>> {
    const path = '/user/assets';
    return this.get(path, {});
  }

  public async postOrder(params: OrderRequest): Promise<BitbankResponse<OrderResponse>> {
    const path = '/user/spot/order';
    return await this.post(path, params);
  }

  async get<T>(path: string, query?: unknown) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += `?${querystring.stringify(query as Record<string, string>)}`;
    }
    const headers = this.makeHeader('/v1'.concat(path, params));
    return super.get(path, query, headers) as T;
  }

  async post<T>(path: string, query: unknown) {
    const data = JSON.stringify(query);
    const headers = this.makeHeader(data);
    return super.post(path, query, headers) as T;
  }

  private makeHeader(uri: string) {
    this.nonce++;
    const message: string = this.nonce.toString().concat(uri);
    return {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.exchangeCredential.apiKey,
      'ACCESS-NONCE': this.nonce.toString(),
      'ACCESS-SIGNATURE': hmacSha256(this.exchangeCredential.apiSecret, message),
    };
  }

  // === public api ===
  public static async getTicker(): Promise<Ticker> {
    const response = await fetch(`${PUBLIC_ENDPOINT}/btc_jpy/ticker`);

    const ticker = (await response.json()) as Ticker;

    console.log(`bitbank: ${JSON.stringify(ticker)}`);

    return ticker;
  }
}
