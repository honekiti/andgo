import { useAtomValue } from 'jotai';
import { Box, VStack, Text, Image } from '@gluestack-ui/themed';
import { white } from '../constants/Colors';
import { getExchange, exchangeTickerFamily } from '../services/exchange-service';
import type { ExchangeId } from '../models';

type ExchangeInfoProps = {
  exchangeId: ExchangeId;
};

export default function ExchangeInfo(props: ExchangeInfoProps) {
  const exchange = getExchange(props.exchangeId);
  const ticker = useAtomValue(exchangeTickerFamily(props.exchangeId));
  const estimatedJpyAmt = ticker.data ? ticker.data.ask * exchange.minBtcAmt : 0;

  return (
    <Box h="auto" w="$full" bg="#000" rounded="$lg">
      <VStack space="md" alignItems="center" py="$4">
        <Image size="xs" resizeMode="contain" source={require('../../assets/images/bitcoin.png')} alt="bitcoin logo" />

        <Text fontSize={12} color={white} bold>
          最低購入量
        </Text>
        <Text fontSize={17} color={white} bold>
          {exchange.minBtcAmt} BTC
        </Text>
        <Text fontSize={11} color={white}>
          {estimatedJpyAmt.toLocaleString('ja-JP', { maximumFractionDigits: 0 })} 円相当
          {ticker.isPending && '取得中...'}
          {ticker.isError && 'エラーが発生しました'}
        </Text>
      </VStack>
    </Box>
  );
}
