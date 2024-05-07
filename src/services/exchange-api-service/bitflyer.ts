import * as querystring from 'querystring';
import { BaseApi } from './base-api';
import { hmacSha256 } from '../../utils/crypto';
import { logFactory } from '../../utils/logger';
import type { ExchangeCredential } from '../../models';
import type { Ticker, SendChildOrderRequest, SendChildOrderResponse, GetBalanceResponse } from './bitflyer.types';

const logger = logFactory('bitflyer');

const PUBLIC_ENDPOINT = 'https://api.bitflyer.com';
const PRIVATE_ENDPOINT = 'https://api.bitflyer.com';
const GET_PERMISSIONS_PATH = '/v1/me/getpermissions';
const GET_BALANCE_PATH = '/v1/me/getbalance';
const POST_SEND_CHILD_ORDER_PATH = '/v1/me/sendchildorder';
const GET_TICKER_PATH = '/v1/ticker';
export const REQUIRED_PERMISSIONS = [GET_BALANCE_PATH, POST_SEND_CHILD_ORDER_PATH];

export class BitFlyer extends BaseApi {
  private readonly exchangeCredential: ExchangeCredential;

  constructor(exchangeCredential: ExchangeCredential) {
    super(PRIVATE_ENDPOINT);

    this.exchangeCredential = exchangeCredential;
  }

  /**
   * APIキーの権限を取得する.
   */
  public getPermissions(): Promise<string[]> {
    return this.get(GET_PERMISSIONS_PATH, {});
  }

  /**
   * 残高を返す.
   */
  public getBalance(): Promise<GetBalanceResponse> {
    return this.get(GET_BALANCE_PATH, {});
  }

  /**
   * 新規注文を出す.
   * @param params
   * @returns
   */
  public async postSendChildOrder(params: SendChildOrderRequest): Promise<SendChildOrderResponse> {
    return await this.post(POST_SEND_CHILD_ORDER_PATH, params);
  }

  async get<T>(path: string, query?: unknown) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += `?${querystring.stringify(query as Record<string, string>)}`;
    }
    const headers = this.makeHeader('GET', path.concat(params));
    logger.info({ msg: 'Request', url: this.endPoint + path + params, headers });
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
      'ACCESS-KEY': this.exchangeCredential.apiKey,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-SIGN': hmacSha256(this.exchangeCredential.apiSecret, message),
      'Content-Type': 'application/json',
    };
  }

  // === public api ===
  public static async getTicker(): Promise<Ticker> {
    const response = await fetch(`${PUBLIC_ENDPOINT}${GET_TICKER_PATH}?product_code=BTC_JPY`);

    const ticker = (await response.json()) as Ticker;

    logger.info({ msg: 'bitflyer', ticker });

    return ticker;
  }
}
