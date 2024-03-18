import { ExchangeId, ExchangeCredential, Ticker, Balance, SuccessOrderResult, FailedOrderResult } from '../../models';
import { Bitbank } from './bitbank';
import { BitFlyer, REQUIRED_PERMISSIONS } from './bitflyer';
import { Coincheck } from './coincheck';
import { gmo } from './gmo';

export const getPermissionsStatus = async (exchangeCredential: ExchangeCredential): Promise<boolean> => {
  switch (exchangeCredential.exchangeId) {
    case 'BITBANK': {
      // TODO: 実装する
      return true;
    }
    case 'BITFLYER': {
      const bitFlyer = new BitFlyer(exchangeCredential);
      const permissions = await bitFlyer.getPermissions();

      return REQUIRED_PERMISSIONS.every((p) => permissions.includes(p));
    }
    case 'COINCHECK': {
      // TODO: 実装する
      return true;
    }
    case 'GMO': {
      // TODO: 実装する
      return true;
    }
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};

export const getTicker = async (exchangeId: ExchangeId): Promise<Ticker> => {
  switch (exchangeId) {
    case 'BITBANK': {
      const r = await Bitbank.getTicker();

      return {
        ask: Number(r.sell),
      };
    }
    case 'BITFLYER': {
      const r = await BitFlyer.getTicker();
      return {
        ask: r.best_ask,
      };
    }
    case 'COINCHECK': {
      const r = await Coincheck.getTicker();
      return {
        ask: r.ask,
      };
    }
    case 'GMO': {
      const r = await gmo.getTicker();
      return {
        ask: Number(r.ask),
      };
    }
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};

export const getBalance = async (exchangeCredential: ExchangeCredential): Promise<Balance> => {
  switch (exchangeCredential.exchangeId) {
    case 'BITBANK': {
      const bitbank = new Bitbank(exchangeCredential);
      const assets = await bitbank.getAssets();
      const jpy = assets.find((a) => a.asset === 'jpy');
      const btc = assets.find((a) => a.asset === 'btc');

      return Object.assign({}, jpy ? { JPY: Number(jpy.free_amount) } : {}, btc ? { BTC: Number(btc.free_amount) } : {});
    }
    case 'BITFLYER': {
      const bitflyer = new BitFlyer(exchangeCredential);
      const balance = await bitflyer.getBalance();
      const jpy = balance.find((b) => b.currency_code === 'JPY');
      const btc = balance.find((b) => b.currency_code === 'BTC');

      return Object.assign({}, jpy ? { JPY: Number(jpy.amount) } : {}, btc ? { BTC: Number(btc.amount) } : {});
    }
    case 'COINCHECK': {
      const coincheck = new Coincheck(exchangeCredential);
      const balance = await coincheck.getBalance();
      return Object.assign({}, { JPY: Number(balance.jpy) }, { BTC: Number(balance.btc) });
    }
    case 'GMO': {
      const Gmo = new gmo(exchangeCredential);
      const assets = await Gmo.getAsset();
      const jpy = assets.find((a) => a.symbol === 'JPY');
      const btc = assets.find((a) => a.symbol === 'BTC');

      return Object.assign({}, jpy ? { JPY: Number(jpy.amount) } : {}, btc ? { BTC: Number(btc.amount) } : {});
    }
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};

export const execBuyOrder = async (exchangeCredential: ExchangeCredential, btcAmount: number): Promise<SuccessOrderResult | FailedOrderResult> => {
  if (process.env.EXPO_PUBLIC_DRY_RUN) {
    console.log('dry run');

    return { status: 'SUCCESS', btcAmount };
  }

  switch (exchangeCredential.exchangeId) {
    case 'BITBANK': {
      const r = await new Bitbank(exchangeCredential).postOrder({
        pair: 'btc_jpy',
        amount: `${btcAmount}`,
        side: 'buy',
        type: 'market',
      });

      if (r.success === 1) {
        return { status: 'SUCCESS', btcAmount };
      }

      return { status: 'FAILED', errorCode: `BITBANK:${r.success}` };
    }
    case 'BITFLYER': {
      // TODO: 実装する
      return { status: 'FAILED', errorCode: 'BITFLYER:-1' };
    }
    case 'COINCHECK': {
      const r = await new Coincheck(exchangeCredential).postOrder({
        market_buy_amount: `${btcAmount}`,
        order_type: 'market_buy',
        pair: 'btc_jpy',
      });

      if (r.success === true) {
        return { status: 'SUCCESS', btcAmount };
      }

      return { status: 'FAILED', errorCode: 'COINCHECK:-1' };
    }
    case 'GMO': {
      // TODO: 実装する
      return { status: 'FAILED', errorCode: 'GMO:-1' };
    }
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};
