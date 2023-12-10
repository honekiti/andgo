import { VStack, HStack, Text } from '@gluestack-ui/themed';

export type ExchangeInfo = {
  name: string;
  balance: number;
};

export type ExchangeInfoItemProps = {
  item: ExchangeInfo;
};

export default function ExchangeInfoItem(props: ExchangeInfoItemProps) {
  return (
    <HStack>
      <VStack>
        <Text>{props.item.name}</Text>
        <Text>{props.item.balance}</Text>
      </VStack>
    </HStack>
  );
}
