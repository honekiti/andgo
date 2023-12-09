import { ExchangeId, ExchangeCredential, Ticker } from '../../models';
import { Bitbank } from './bitbank';

export const getTicker = async (exchangeId: ExchangeId): Promise<Ticker> => {
  switch (exchangeId) {
    case 'bitbank': {
      const r = await Bitbank.getTicker();

      return {
        ask: Number(r.sell),
      };
    }
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};

export const execBuyOrder = async (
  exchangeId: ExchangeId,
  exchangeCredential: ExchangeCredential,
  btcAmount: number,
): Promise<{ status: 'SUCCESS' | 'ORDER_FAILED' }> => {
  if (process.env.EXPO_PUBLIC_DRY_RUN) {
    console.log('dry run');

    return { status: 'SUCCESS' };
  }

  switch (exchangeId) {
    case 'bitbank': {
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
    default:
      throw new Error('EXCHANGE_NOT_SUPPORTED');
  }
};
