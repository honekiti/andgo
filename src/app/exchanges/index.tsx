import { useState, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { Box, Button, FlatList, HStack, VStack, Text, Icon, ButtonText, GripVerticalIcon, useToast, Toast, ToastTitle } from '@gluestack-ui/themed';
import { Stack, Link, useFocusEffect } from 'expo-router';
import { loadCredentials } from '../../services/exchange-credential-service';
import { EXCHANGES } from '../../master';
import { ExchangeCredential, ExchangeId } from '../../models';
import { white, unclearWhite, darkGrey } from '../../constants/Colors';
import { saveCredentials } from '../../services/exchange-credential-service';

export type ExchangeInfo = {
  name: string;
  balance?: number;
};

export default function ExchangeListScreen() {
  const toast = useToast();
  const [credentials, setCredentials] = useState<ExchangeCredential[]>([]);
  const [balances, setBalances] = useState<(number | undefined)[]>([]);
  const items: ExchangeInfo[] = credentials.map((credential, index) => ({
    name: EXCHANGES.find((ex) => ex.id === credential.exchangeId)?.name ?? 'unknown',
    balance: balances[index],
  }));

  const handlePressUnregister = (id: ExchangeId) => {
    const newCredentials = credentials.filter((c) => c.exchangeId !== id);
    saveCredentials(newCredentials);
    setCredentials(newCredentials);

    toast.show({
      render: () => (
        <Toast action="success">
          <ToastTitle>連携を解除しました</ToastTitle>
        </Toast>
      ),
    });
  };

  const renderItem: ListRenderItem<ExchangeInfo> = ({ item }) => {
    return (
      <HStack justifyContent="space-between" alignItems="center" p="$4" borderBottomWidth={0.3} borderBottomColor={unclearWhite}>
        <VStack space="md" py="$1">
          <Text color={white} fontSize={23} bold>
            {item.name}
          </Text>
          <HStack space="xs">
            <Text color={white} fontSize={12}>
              残高
            </Text>
            <Text color={white} fontSize={18}>
              {item.balance !== undefined ? item.balance.toLocaleString() : '---'}
            </Text>
            <Text color={white} fontSize={12}>
              円
            </Text>
          </HStack>
        </VStack>
        <Icon as={GripVerticalIcon} color={white} size="lg" />
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
    <Box flex={1} bg={darkGrey} justifyContent="space-between">
      <Stack.Screen
        options={{
          title: '取引所',
          presentation: 'card',
        }}
      />

      <VStack>
        {/* type bug: https://github.com/gluestack/gluestack-ui/issues/1041 */}
        {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
        <FlatList data={items} renderItem={renderItem as any} keyExtractor={(item) => (item as ExchangeInfo).name} />
      </VStack>

      <HStack justifyContent="space-between" alignItems="center" p="$4" mb="$3" borderTopWidth={0.3} borderColor={unclearWhite}>
        <Text color={white}>取引所と連携しよう</Text>
        <Link href="/exchange-registration" asChild>
          <Button w="$24" size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} rounded="$full" bgColor="#f97316">
            <ButtonText>連携</ButtonText>
          </Button>
        </Link>
      </HStack>
    </Box>
  );
}
