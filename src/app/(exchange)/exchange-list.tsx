import { useState, useCallback } from 'react';
import { ListRenderItem, TouchableOpacity } from 'react-native';
import { Box, Button, FlatList, HStack, VStack, Text, ChevronLeftIcon, Icon, ButtonText, GripVerticalIcon } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { loadCredentials } from '../../services/exchange-credential-service';
import { EXCHANGES } from '../../master';
import { ExchangeCredential } from '../../models';
import { white, unclearWhite, darkGrey, lightGrey } from '../../constants/Colors';
import { useFocusEffect } from 'expo-router';

export type ExchangeInfo = {
  name: string;
  balance?: number;
};

export default function ExchangeListScreen() {
  const [credentials, setCredentials] = useState<ExchangeCredential[]>([
    { id: 'bitbank', apiKey: 'aaa', apiSecret: 'bbb' },
    { id: 'bitflyer', apiKey: 'aaa', apiSecret: 'bbb' },
  ]);
  const [balances, setBalances] = useState<(number | undefined)[]>([]);
  const data = credentials.map((credential, index) => ({
    name: EXCHANGES.find((ex) => ex.id === credential.id)?.name ?? 'unknown',
    balance: balances[index],
  }));

  const renderItem: ListRenderItem<ExchangeInfo> = ({ item }) => {
    return (
      <HStack>
        <VStack>
          <Text>{item.name}</Text>
          <Text>{item.balance ?? '-'}</Text>
        </VStack>
      </HStack>
    );
  };

  // TODO: 取引所連携情報読み込みを有効にする(コメントアウトを解除する)
  // useFocusEffect(
  //   useCallback(() => {
  //     loadCredentials().then((credentials) => {
  //       setCredentials(credentials);
  //       // TODO: lazy load balances
  //       setBalances(Array(credentials.length).fill(undefined));
  //     });
  //   }, []),
  // );

  return (
    <Box flex={1} bg={darkGrey} justifyContent="space-between">
      <VStack>
        <HStack justifyContent="space-between" alignItems="center" p="$4" borderBottomWidth={0.3} borderBottomColor={unclearWhite}>
          <VStack space="md" py="$1">
            <Text color={white} fontSize={23} bold>
              Kraken
            </Text>
            <HStack space="xs">
              <Text color={white} fontSize={12}>
                残高
              </Text>
              <Text color={white} fontSize={18}>
                123,456
              </Text>
              <Text color={white} fontSize={12}>
                円
              </Text>
            </HStack>
          </VStack>
          <Icon as={GripVerticalIcon} color={white} size="lg" />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center" p="$4" borderBottomWidth={0.3} borderBottomColor={unclearWhite}>
          <VStack space="md" py="$1">
            <Text color={white} fontSize={23} bold>
              bitbank
            </Text>
            <HStack space="xs">
              <Text color={white} fontSize={12}>
                残高
              </Text>
              <Text color={white} fontSize={18}>
                123,456
              </Text>
              <Text color={white} fontSize={12}>
                円
              </Text>
            </HStack>
          </VStack>
          <Icon as={GripVerticalIcon} color={white} size="lg" />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center" p="$4" borderBottomWidth={0.3} borderBottomColor={unclearWhite}>
          <VStack space="md" py="$1">
            <Text color={white} fontSize={23} bold>
              coincheck
            </Text>
            <HStack space="xs">
              <Text color={white} fontSize={12}>
                残高
              </Text>
              <Text color={white} fontSize={18}>
                123,456
              </Text>
              <Text color={white} fontSize={12}>
                円
              </Text>
            </HStack>
          </VStack>
          <Icon as={GripVerticalIcon} color={white} size="lg" />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center" p="$4" borderBottomWidth={0.3} borderBottomColor={unclearWhite}>
          <VStack space="md" py="$1">
            <Text color={white} fontSize={23} bold>
              bitFlyer
            </Text>
            <HStack space="xs">
              <Text color={white} fontSize={12}>
                残高
              </Text>
              <Text color={white} fontSize={18}>
                123,456
              </Text>
              <Text color={white} fontSize={12}>
                円
              </Text>
            </HStack>
          </VStack>
          <Icon as={GripVerticalIcon} color={white} size="lg" />
        </HStack>
      </VStack>

      <HStack justifyContent="space-between" alignItems="center" p="$4" mb="$3" borderTopWidth={0.3} borderColor={unclearWhite}>
        <Text color={white}>取引所と連携しよう</Text>
        <Link href="/exchange-registration" asChild>
          <Button w="$24" size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} rounded="$full">
            <ButtonText>連携</ButtonText>
          </Button>
        </Link>
      </HStack>
    </Box>
  );
}
