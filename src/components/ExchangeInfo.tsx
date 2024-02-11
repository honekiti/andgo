import { Box, VStack, Text } from '@gluestack-ui/themed';
import { white } from '../constants/Colors';
import { getExchange } from '../services/plan-service';
import type { ExchangeId } from '../models';

type ExchangeInfoProps = {
  exchangeId: ExchangeId;
};

export default function ExchangeInfo(props: ExchangeInfoProps) {
  const exchange = getExchange(props.exchangeId);

  return (
    <Box h="auto" w="$full" bg="#000" rounded="$lg">
      <VStack space="md" alignItems="center" py="$4">
        <Box h="$8" w="$8" rounded="$full" bg="#00f" />
        <Text fontSize={12} color={white} bold>
          最低購入量
        </Text>
        <Text fontSize={17} color={white} bold>
          {exchange.minBtcAmt} BTC
        </Text>
        <Text fontSize={11} color={white}>
          1000円相当
        </Text>
      </VStack>
    </Box>
  );
}
