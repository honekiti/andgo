import { ExchangeId, ExchangeCredential, Ticker, Balance } from '../../models';
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
      // TODO: 実装する
      return {
        JPY: 0,
        BTC: 0,
      };
    }
    case 'COINCHECK': {
      // TODO: 実装する
      return {
        JPY: 0,
        BTC: 0,
      };
    }
    case 'GMO': {
      // TODO: 実装する
      return {
        JPY: 0,
        BTC: 0,
      };
    }
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};

export const execBuyOrder = async (exchangeCredential: ExchangeCredential, btcAmount: number): Promise<{ status: 'SUCCESS' | 'ORDER_FAILED' }> => {
  if (process.env.EXPO_PUBLIC_DRY_RUN) {
    console.log('dry run');

    return { status: 'SUCCESS' };
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
        return { status: 'SUCCESS' };
      }

      return { status: 'ORDER_FAILED' };
    }
    case 'BITFLYER': {
      // TODO: 実装する
      return { status: 'ORDER_FAILED' };
    }
    case 'COINCHECK': {
      const r = await new Coincheck(exchangeCredential).postOrder({
        market_buy_amount: `${btcAmount}`,
        order_type: 'market_buy',
        pair: 'btc_jpy',
      });

      if (r.success === true) {
        return { status: 'SUCCESS' };
      }

      return { status: 'ORDER_FAILED' };
    }
    case 'GMO': {
      // TODO: 実装する
      return { status: 'ORDER_FAILED' };
    }
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};
