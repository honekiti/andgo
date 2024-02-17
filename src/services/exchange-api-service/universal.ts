import { ExchangeId, ExchangeCredential, Ticker } from '../../models';
import { Bitbank } from './bitbank';
import { BitFlyer, REQUIRED_PERMISSIONS } from './bitflyer';

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
      // TODO: 実装する
      return {
        ask: 0,
      };
    }
    case 'GMO': {
      // TODO: 実装する
      return {
        ask: 0,
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
      // TODO: 実装する
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
