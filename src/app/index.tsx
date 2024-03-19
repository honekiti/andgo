import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetAtom, useAtomValue } from 'jotai';
import { Link, Stack } from 'expo-router';
import { Box, Button, ButtonText, VStack, useToast, Toast, ToastTitle } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@gluestack-ui/themed';
import { plansAtom } from '../services/plan-service';
import { exchangeCredentialsAtom, exchangeTickerFamily } from '../services/exchange-service';
import { accountAtom } from '../services/account-service';
import { orderFamily } from '../services/order-service';
import { DEFAULT_ACCOUNT_VALUE } from '../master';
import { store } from '../store';
import type { ExchangeCredential, Plan, Order, SuccessOrderResult } from '../models';

const DEBUG_CREDENTIALS: ExchangeCredential[] = [
  {
    exchangeId: 'BITFLYER',
    apiKey: 'DEBUG_API_KEY',
    apiSecret: 'DEBUG_API_SECRET',
  },
  {
    exchangeId: 'COINCHECK',
    apiKey: 'DEBUG_API_KEY',
    apiSecret: 'DEBUG_API_SECRET',
  },
  {
    exchangeId: 'BITBANK',
    apiKey: 'DEBUG_API_KEY',
    apiSecret: 'DEBUG_API_SECRET',
  },
];

const DEBUG_PLANS: Plan[] = [
  {
    id: 'DEBUG_PLAN1',
    exchangeId: 'BITFLYER',
    quoteAmount: 1000,
    planTypeId: 'DAILY',
    status: {
      enabled: false,
      refAt: new Date().getTime(),
      nextIndex: 0,
      nextAt: new Date().getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN2',
    exchangeId: 'COINCHECK',
    quoteAmount: 1000,
    planTypeId: 'WEEKLY',
    status: {
      enabled: false,
      refAt: new Date().getTime(),
      nextIndex: 0,
      nextAt: new Date().getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN3',
    exchangeId: 'BITBANK',
    quoteAmount: 1000,
    planTypeId: 'MONTHLY',
    status: {
      enabled: false,
      refAt: new Date().getTime(),
      nextIndex: 0,
      nextAt: new Date().getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN4',
    exchangeId: 'BITFLYER',
    quoteAmount: 1000,
    planTypeId: 'DAILY',
    status: {
      enabled: true,
      refAt: new Date().getTime(),
      nextIndex: 0,
      nextAt: new Date().getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN5',
    exchangeId: 'COINCHECK',
    quoteAmount: 1000,
    planTypeId: 'WEEKLY',
    status: {
      enabled: true,
      refAt: new Date().getTime(),
      nextIndex: 0,
      nextAt: new Date().getTime(),
    },
  },
  {
    id: 'DEBUG_PLAN6',
    exchangeId: 'BITBANK',
    quoteAmount: 1000,
    planTypeId: 'MONTHLY',
    status: {
      enabled: true,
      refAt: new Date().getTime(),
      nextIndex: 0,
      nextAt: new Date().getTime(),
    },
  },
];

const DEBUG_ORDERS: Order[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  orderedAt: new Date().getTime() + i * 1000 * 60 * 60 * 24,
  planSnapshot: DEBUG_PLANS[i % DEBUG_PLANS.length],
  result: {
    status: 'SUCCESS',
    btcAmount: 0.01,
  },
}));

const TickerInfos = () => {
  const bitFlyer = useAtomValue(exchangeTickerFamily('BITFLYER'));
  const bitbank = useAtomValue(exchangeTickerFamily('BITBANK'));
  const coincheck = useAtomValue(exchangeTickerFamily('COINCHECK'));
  const gmo = useAtomValue(exchangeTickerFamily('GMO'));

  return (
    <VStack m="$2" p="$2" bgColor="$primary100">
      <Text>bitFlyer: {JSON.stringify(bitFlyer.data)}</Text>
      <Text>bitbank: {JSON.stringify(bitbank.data)}</Text>
      <Text>coincheck: {JSON.stringify(coincheck.data)}</Text>
      <Text>gmo: {JSON.stringify(gmo.data)}</Text>
    </VStack>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const setPlans = useSetAtom(plansAtom);
  const setExchangeCredentials = useSetAtom(exchangeCredentialsAtom);
  const setAccount = useSetAtom(accountAtom);

  const handleReset = async (withFixtures: boolean) => {
    toast.show({
      render: () => (
        <Toast>
          <ToastTitle>データを初期化しました</ToastTitle>
        </Toast>
      ),
    });

    if (!withFixtures) {
      await AsyncStorage.clear();
      await setAccount(DEFAULT_ACCOUNT_VALUE);
      await setExchangeCredentials([]);
      await setPlans([]);
      // ORDERは初期化しなくてよい

      return;
    }

    const successOrders = DEBUG_ORDERS.filter((order) => order.result.status === 'SUCCESS');
    await setAccount({
      agreement: false,
      numOfOrders: successOrders.length,
      totalBtcAmount: successOrders.reduce((acc, order) => acc + ((order.result as SuccessOrderResult).btcAmount ?? 0), 0),
    });

    await setExchangeCredentials(DEBUG_CREDENTIALS);
    await setPlans(DEBUG_PLANS);
    await Promise.all(DEBUG_ORDERS.map((order) => store.set(orderFamily(order.id), order)));
  };

  return (
    <Box pt={insets.top} pb={insets.bottom} pl={insets.left} pr={insets.right}>
      <Stack.Screen options={{ title: 'デバッグ', headerShown: false }} />

  return null;
}
