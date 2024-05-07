import * as querystring from 'querystring';
import { BaseApi } from './base-api';
import { hmacSha256 } from '../../utils/crypto';
import type { ExchangeCredential } from '../../models';
import type { Ticker, GetBalanceResponse, OrderRequest, OrderResponse } from './coincheck.types';

const PUBLIC_ENDPOINT = 'https://coincheck.com';
const PRIVATE_ENDPOINT = 'https://coincheck.com';
const GET_BALANCE_PATH = '/api/accounts/balance';
const POST_ORDER_PATH = '/api/exchange/orders';
const GET_TICKER_PATH = '/api/ticker';

export class Coincheck extends BaseApi {
  private readonly exchangeCredential: ExchangeCredential;
  private nonce: number;

  constructor(exchangeCredential: ExchangeCredential) {
    super(PRIVATE_ENDPOINT);

    this.exchangeCredential = exchangeCredential;
    this.nonce = new Date().getTime();
  }

  public getBalance(): Promise<GetBalanceResponse> {
    return this.get(GET_BALANCE_PATH, {});
  }

  public async postOrder(params: OrderRequest): Promise<OrderResponse> {
    return await this.post(POST_ORDER_PATH, params);
  }
  async get<T>(path: string, query?: unknown) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += `?${querystring.stringify(query as Record<string, string>)}`;
    }
    const headers = this.makeHeader(path.concat(params));
    return super.get(path, query, headers) as T;
  }

  async post<T>(path: string, query: unknown) {
    const data = JSON.stringify(query);
    const headers = this.makeHeader(data);
    return super.post(path, query, headers) as T;
  }

  private makeHeader(uri: string) {
    const message: string = this.nonce.toString().concat(`${this.endPoint}${uri}`);
    return {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.exchangeCredential.apiKey,
      'ACCESS-NONCE': this.nonce.toString(),
      'ACCESS-SIGNATURE': hmacSha256(this.exchangeCredential.apiSecret, message),
    };
  }

  // === public api ===
  public static async getTicker(): Promise<Ticker> {
    const response = await fetch(`${PUBLIC_ENDPOINT}${GET_TICKER_PATH}`);

    const ticker = (await response.json()) as Ticker;

    return ticker;
  }
}
