import { useAtom, useAtomValue } from 'jotai';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, Button, ButtonText, VStack, useToast, Toast, ToastTitle, ScrollView } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { plansAtom } from '../services/plan-service';
import { exchangeCredentialsAtom, exchangeTickerFamily } from '../services/exchange-service';
import { accountAtom } from '../services/account-service';
import { orderFamily } from '../services/order-service';
import { store } from '../store';
import type { SuccessOrderResult } from '../models';
import { ordersAtom } from '../services/aggregate/calendar-service';
import { DEBUG_CREDENTIALS, DEBUG_ORDERS, DEBUG_PLANS } from '../fixtures';
import { hardReset } from '../services/advanced-service';
import { scheduleNotification } from '../services/notification-service';

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

    await hardReset();

    if (!withFixtures) {
      return;
    }

    // 最初にordersを初期化しないとordersAtomで参照エラーが発生する
    await Promise.all(DEBUG_ORDERS.map((order) => store.set(orderFamily(order.id), order)));
    const successBuyOrders = DEBUG_ORDERS.filter((order) => order.planSnapshot.orderType === 'BUY' && order.result.status === 'SUCCESS');
    await setAccount({
      dryRun: true,
      agreement: false,
      numOfOrders: DEBUG_ORDERS.length,
      totalBtcAmount: successBuyOrders.reduce((acc, order) => acc + ((order.result as SuccessOrderResult).btcAmount ?? 0), 0),
      totalSpentAmount: successBuyOrders.reduce((acc, order) => acc + (order.planSnapshot.buy?.quoteAmount ?? 0), 0),
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
          <Text>account: {JSON.stringify(account, null, 2)}</Text>
        </VStack>

        <VStack m="$2" p="$2" bgColor="$primary100">
          <Text>plans: {JSON.stringify(plans, null, 2)}</Text>
        </VStack>

        <VStack m="$2" p="$2" bgColor="$primary100">
          <Text>exchangeCredentials: {JSON.stringify(exchangeCredentials, null, 2)}</Text>
        </VStack>

        <VStack m="$2" p="$2" bgColor="$primary100">
          <Text>orders: {JSON.stringify(orders, null, 2)}</Text>
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

          <Button
            borderRadius="$full"
            onPress={() =>
              scheduleNotification({
                title: '通知テスト',
                body: 'テスト1\nテスト2',
                type: 'INFO',
                dateInUtc: Date.now(),
              })
            }
          >
            <ButtonText>ローカル通知テスト</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
