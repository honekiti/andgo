import { useAtomValue } from 'jotai';
import React from 'react';
import { Box, Button, FlatList, HStack, VStack, Text, ButtonText } from '@gluestack-ui/themed';
import { Stack, Link } from 'expo-router';
import type { ExchangeCredential } from '../../models';
import { white, unclearWhite, darkGrey } from '../../constants/Colors';
import { exchangeCredentialsAtom, getExchangeFromCredential } from '../../services/exchange-service';
import ExchangeItem from '../../components/ExchangeItem';

export default function ExchangeListScreen() {
  const credentials = useAtomValue(exchangeCredentialsAtom);

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
        <FlatList
          data={credentials}
          renderItem={({ item }) => <ExchangeItem exchange={getExchangeFromCredential(item as ExchangeCredential)} />}
          keyExtractor={(item) => (item as ExchangeCredential).exchangeId}
        />
      </VStack>

      <HStack justifyContent="space-between" alignItems="center" p="$4" mb="$3" borderTopWidth={0.3} borderColor={unclearWhite}>
        <Text color={white}>取引所と連携しよう</Text>
        <Link href="/exchanges/add" asChild>
          <Button w="$24" size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} rounded="$full" bgColor="#f97316">
            <ButtonText>連携</ButtonText>
          </Button>
        </Link>
      </HStack>
    </Box>
  );
}
