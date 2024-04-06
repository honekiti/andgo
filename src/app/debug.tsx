import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, Button, ButtonText, VStack, useToast, Toast, ToastTitle, ScrollView } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { plansAtom } from '../services/plan-service';
import { exchangeCredentialsAtom, exchangeTickerFamily } from '../services/exchange-service';
import { accountAtom } from '../services/account-service';
import { orderFamily } from '../services/order-service';
import { store } from '../store';
import type { ExchangeCredential, Plan, Order, SuccessOrderResult } from '../models';
import { ordersAtom } from '../services/calendar-service';

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
    quoteAmount: 100000,
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
    quoteAmount: 100000,
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
    quoteAmount: 100000,
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
    quoteAmount: 100000,
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
    quoteAmount: 50000000,
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
    quoteAmount: 100000,
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
  id: `ORD_${i}`,
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

export default function DebugScreen() {
  const toast = useToast();
  const [plans, setPlans] = useAtom(plansAtom);
  const [exchangeCredentials, setExchangeCredentials] = useAtom(exchangeCredentialsAtom);
  const [account, setAccount] = useAtom(accountAtom);
  const orders = useAtomValue(ordersAtom);

  const handleReset = async (withFixtures: boolean) => {
    toast.show({
      render: () => (
        <Toast>
          <ToastTitle>データを初期化しました</ToastTitle>
        </Toast>
      ),
    });

    await AsyncStorage.clear();

    if (!withFixtures) {
      await setAccount(RESET);
      await setExchangeCredentials(RESET);
      await setPlans(RESET);

      return;
    }

    // 最初にordersを初期化しないとordersAtomで参照エラーが発生する
    await Promise.all(DEBUG_ORDERS.map((order) => store.set(orderFamily(order.id), order)));
    const successOrders = DEBUG_ORDERS.filter((order) => order.result.status === 'SUCCESS');
    await setAccount({
      agreement: false,
      numOfOrders: successOrders.length,
      totalBtcAmount: successOrders.reduce((acc, order) => acc + ((order.result as SuccessOrderResult).btcAmount ?? 0), 0),
    });

    await setExchangeCredentials(DEBUG_CREDENTIALS);
    await setPlans(DEBUG_PLANS);
  };

  return (
    <SafeAreaView flex={1}>
      <Stack.Screen options={{ title: 'デバッグ', headerShown: false }} />

      <ScrollView h="$1/2" mb="$2">
        <TickerInfos />

        <VStack m="$2" p="$2" bgColor="$primary100">
          <Text>account: {JSON.stringify(account)}</Text>
        </VStack>

        <VStack m="$2" p="$2" bgColor="$primary100">
          <Text>plans: {JSON.stringify(plans)}</Text>
        </VStack>

        <VStack m="$2" p="$2" bgColor="$primary100">
          <Text>exchangeCredentials: {JSON.stringify(exchangeCredentials)}</Text>
        </VStack>

        <VStack m="$2" p="$2" bgColor="$primary100">
          <Text>orders: {JSON.stringify(orders)}</Text>
        </VStack>
      </ScrollView>

      <ScrollView>
        <VStack space="xs">
          <Link href="/exchanges" asChild>
            <Button borderRadius="$full">
              <ButtonText>取引所一覧画面</ButtonText>
            </Button>
          </Link>

          <Link href="/exchanges/add" asChild>
            <Button borderRadius="$full">
              <ButtonText>取引所連携画面</ButtonText>
            </Button>
          </Link>

          <Link href="/tutorial" asChild>
            <Button borderRadius="$full">
              <ButtonText>チュートリアル画面</ButtonText>
            </Button>
          </Link>

          <Link href="/terms-of-service" asChild>
            <Button borderRadius="$full">
              <ButtonText>利用規約同意画面</ButtonText>
            </Button>
          </Link>

          <Link href="/plans/DEBUG_PLAN1" asChild>
            <Button borderRadius="$full">
              <ButtonText>積立プラン編集画面</ButtonText>
            </Button>
          </Link>

          <Link href="/plans/add" asChild>
            <Button borderRadius="$full">
              <ButtonText>積立プラン作成画面</ButtonText>
            </Button>
          </Link>

          <Link href="/home" asChild>
            <Button borderRadius="$full">
              <ButtonText>ホーム画面</ButtonText>
            </Button>
          </Link>

          <Link href="/config" asChild>
            <Button borderRadius="$full">
              <ButtonText>設定画面</ButtonText>
            </Button>
          </Link>

          <Button borderRadius="$full" onPress={() => handleReset(false)}>
            <ButtonText>データ初期化(空データ)</ButtonText>
          </Button>

          <Button borderRadius="$full" onPress={() => handleReset(true)}>
            <ButtonText>データ初期化(モックデータ)</ButtonText>
          </Button>

          <Button borderRadius="$full" onPress={() => setAccount({ ...account, agreement: true })}>
            <ButtonText>利用規約同意済にする</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
