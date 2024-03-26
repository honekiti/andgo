import { useAtomValue } from 'jotai';
import { Box, VStack, Text } from '@gluestack-ui/themed';
import { white } from '../constants/Colors';
import { getExchange, exchangeTickerFamily, BTC_PRECISION, exchangeCredentialsAtom } from '../services/exchange-service';
import type { ExchangeId } from '../models';

type ExchangeInfoProps = {
  exchangeId: ExchangeId;
};

export default function ExchangeInfo(props: ExchangeInfoProps) {
  const exchange = getExchange(props.exchangeId);
  const { data, isPending, isError } = useAtomValue(exchangeTickerFamily(props.exchangeId));
  const credentials = useAtomValue(exchangeCredentialsAtom);
  const refExchangeId = credentials.length > 0 ? credentials[0].exchangeId : 'BITFLYER';
  const ticker = useAtomValue(exchangeTickerFamily(refExchangeId));

  const estimatedJpyAmt = ticker.data ? ticker.data.ask * exchange.minBtcAmt : 0;

  return (
    <Box h="auto" w="$full" bg="#000" rounded="$lg">
      <VStack space="md" alignItems="center" py="$4">
        <Box h="$8" w="$8" rounded="$full" bg="#00f" />
        <Text fontSize={12} color={white} bold>
          最低購入量
        </Text>
        <Text fontSize={17} color={white} bold>
          {exchange.minBtcAmt.toFixed(BTC_PRECISION)} BTC
        </Text>
        <Text fontSize={11} color={white}>
          {estimatedJpyAmt.toLocaleString('ja-JP', { maximumFractionDigits: 0 })} 円相当
          {JSON.stringify(data)}
          {isPending && '取得中...'}
          {isError && 'エラーが発生しました'}
        </Text>
      </VStack>
    </Box>
  );
}
