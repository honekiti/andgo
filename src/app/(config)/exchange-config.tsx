import { useState, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { Box, FlatList, HStack, VStack, Text } from '@gluestack-ui/themed';
import { useFocusEffect } from 'expo-router';
import { loadCredentials } from '../../services/exchange-credential-service';
import { EXCHANGES } from '../../master';
import { ExchangeCredential } from '../../models';

export type ExchangeInfo = {
  name: string;
  balance?: number;
};

export default function ExchangeConfigScreen() {
  const [credentials, setCredentials] = useState<ExchangeCredential[]>([]);
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

  useFocusEffect(
    useCallback(() => {
      loadCredentials().then((credentials) => {
        setCredentials(credentials);
        // TODO: lazy load balances
        setBalances(Array(credentials.length).fill(undefined));
      });
    }, []),
  );

  return (
    <Box py="$10">
      {/* type bug: https://github.com/gluestack/gluestack-ui/issues/1041 */}
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <FlatList data={data} renderItem={renderItem as any} keyExtractor={(item) => (item as ExchangeInfo).name} />
    </Box>
  );
}
