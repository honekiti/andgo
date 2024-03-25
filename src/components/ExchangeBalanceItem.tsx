import { useAtomValue } from 'jotai';
import { HStack, Text } from '@gluestack-ui/themed';
import type { ExchangeMaster } from '../models';
import { white, unclearWhite, darkGrey, lightGrey, orange } from '../constants/Colors';
import { exchangeBalanceFamily } from '../services/exchange-service';

export default function ExchangeBalanceItem(props: { exchange: ExchangeMaster }) {
  const balanceInfo = useAtomValue(exchangeBalanceFamily(props.exchange.id));

  return (
    <HStack justifyContent="space-between">
      <Text color={white} fontSize={12} bold>
        {props.exchange.name}
      </Text>
      <HStack>
        <Text color={white} fontSize={12}>
          {balanceInfo.data?.JPY !== undefined ? balanceInfo.data.JPY.toLocaleString() : '---'}
        </Text>
        <Text color={white} fontSize={12}>
          円
        </Text>
      </HStack>
    </HStack>
  );
}
