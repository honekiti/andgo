import { useState, useCallback } from 'react';
import { ListRenderItem, TouchableOpacity } from 'react-native';
import { Box, Button, FlatList, HStack, VStack, Text, ChevronLeftIcon, Icon, ButtonText } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { loadCredentials } from '../../services/exchange-credential-service';
import { EXCHANGES } from '../../master';
import { ExchangeCredential } from '../../models';
import { white, unclearWhite, darkGrey, lightGrey } from '../../constants/Colors';

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
    <Box flex={1} bg={darkGrey}>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          Krarken
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          Bitbank
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          coincheck
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          bitFlyer
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box flexDirection="row" width="100%" height={'8%'} borderTopWidth={2} borderTopColor="#404040" alignItems="center" p={'$4'} marginTop={'90%'}>
        <Text color="white" fontSize={18}>
          取引所と連携しよう
        </Text>
        <Link href="/schedule-registration" asChild>
          <Button borderRadius="$full" bgColor="white" justifyContent="center" alignItems="center" marginLeft={'35%'}>
            <ButtonText color="black">連携</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
