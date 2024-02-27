import * as querystring from 'querystring';
import { BaseApi } from './base-api';
import { hmacSha256 } from '../../utils/crypto';
import { ExchangeCredential } from '../../models';
import { Ticker, OrderRequest, OrderResponse, AssetsResponse } from './gmo.types';

const PUBLIC_ENDPOINT = 'https://api.coin.z.com/public';
const PRIVATE_ENDPOINT = 'https://api.coin.z.com/private';
const GET_ASSETS_PATH = '/v1/account/assets';
const POST_ORDER_PATH = '/v1//order';
const GET_TICKER_PATH = '/v1/ticker';
const GET_STATUS_PATH = '/v1/status';
const PUBLIC_TICKER_PATH = 'https://api.coin.z.com/public/v1/ticker?symbol=BTC';

export class gmo extends BaseApi {
  private readonly exchangeCredential: ExchangeCredential;

  constructor(exchangeCredential: ExchangeCredential) {
    super(PRIVATE_ENDPOINT);

    this.exchangeCredential = exchangeCredential;
  }

  public getStatus(): Promise<string[]> {
    return this.get(GET_STATUS_PATH, {});
  }

  public getAsset(): Promise<AssetsResponse> {
    return this.get(GET_ASSETS_PATH, {});
  }

  public async postOrder(params: OrderRequest): Promise<OrderResponse> {
    return await this.post(POST_ORDER_PATH, params);
  }

  /**
   * 新規注文を出す.
   * @param params
   * @returns
   */

  async get<Ticker>(path: string, query?: unknown) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += `?${querystring.stringify(query as Record<string, string>)}`;
    }
    const headers = this.makeHeader('GET', path.concat(params));
    return super.get(path, query, headers) as Ticker;
  }

  async post<Ticker>(path: string, query: unknown) {
    const data = JSON.stringify(query);
    const headers = this.makeHeader('POST', path, data);
    return super.post(path, query, headers) as Ticker;
  }

  private makeHeader(method: string, uri: string, body?: string) {
    const timestamp = Date.now().toString();
    const message: string = timestamp.concat(method, uri, body ?? '');
    return {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.exchangeCredential.apiKey,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-SIGN': hmacSha256(this.exchangeCredential.apiSecret, message),
    };
  }

  // === public api ===
  public static async getTicker(): Promise<Ticker> {
    const response = await fetch(`${PUBLIC_TICKER_PATH}`);

    const ticker = (await response.json()) as Ticker;

    console.log(`gmo: ${JSON.stringify(ticker)}`);

    return ticker;
  }
}
