import * as querystring from 'querystring';
import { BaseApi } from './base-api';
import { hmacSha256 } from '../../utils/crypto';
import { ExchangeCredential } from '../../models';
import { Ticker, OrderRequest, OrderResponse, AssetsResponse, GMOResponse } from './gmo.types';

const PUBLIC_ENDPOINT = 'https://api.coin.z.com/public';
const PRIVATE_ENDPOINT = 'https://api.coin.z.com/private';
const GET_ASSETS_PATH = '/v1/account/assets';
const POST_ORDER_PATH = '/v1//order';
const GET_TICKER_PATH = '/v1/ticker';
const GET_STATUS_PATH = '/v1/status';

export class gmo extends BaseApi {
  private readonly exchangeCredential: ExchangeCredential;

  constructor(exchangeCredential: ExchangeCredential) {
    super(PRIVATE_ENDPOINT);

    this.exchangeCredential = exchangeCredential;
  }

  public getStatus(): Promise<string[]> {
    return this.get(GET_STATUS_PATH, {});
  }

  public async getAsset(): Promise<AssetsResponse> {
    const response = await this.get<GMOResponse<AssetsResponse>>(GET_ASSETS_PATH, {});
    return response.data;
  }

  public async postOrder(params: OrderRequest): Promise<OrderResponse> {
    return await this.post(POST_ORDER_PATH, params);
  }

  /**
   * 新規注文を出す.
   * @param params
   * @returns
   */

  async get<T>(path: string, query?: unknown) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += `?${querystring.stringify(query as Record<string, string>)}`;
    }
    const headers = this.makeHeader('GET', path.concat(params));
    return super.get(path, query, headers) as T;
  }

  async post<T>(path: string, query: unknown) {
    const data = JSON.stringify(query);
    const headers = this.makeHeader('POST', path, data);
    return super.post(path, query, headers) as T;
  }

  private makeHeader(method: string, uri: string, body?: string) {
    const timestamp = Date.now().toString();
    const message: string = timestamp.concat(method, uri, body ?? '');
    return {
      'Content-Type': 'application/json',
      'API-KEY': this.exchangeCredential.apiKey,
      'API-TIMESTAMP': timestamp,
      'API-SIGN': hmacSha256(this.exchangeCredential.apiSecret, message),
    };
  }

  // === public api ===
  public static async getTicker(): Promise<Ticker> {
    const response = await fetch(`${PUBLIC_ENDPOINT}${GET_TICKER_PATH}?symbol=BTC`);

    const obj = (await response.json()) as GMOResponse<Ticker[]>;

    console.log(`gmo: ${JSON.stringify(obj)}`);

    if (obj.status !== 0) {
      throw new Error('Failed to fetch ticker info from GMO Coin');
    }

    const ticker = obj.data[0];

    return ticker;
  }
}
