import { useSetAtom, useAtomValue } from 'jotai';
import { Link, Stack } from 'expo-router';
import { Box, Button, ButtonText, VStack, useToast, Toast, ToastTitle } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@gluestack-ui/themed';
import { plansAtom } from '../services/plan-service';
import { exchangeCredentialsAtom, exchangeTickerFamily } from '../services/exchange-service';

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

  const handleReset = async (withFixtures: boolean) => {
    toast.show({
      render: () => (
        <Toast>
          <ToastTitle>データを初期化しました</ToastTitle>
        </Toast>
      ),
    });

    if (!withFixtures) {
      await setExchangeCredentials([]);
      await setPlans([]);

      return;
    }

    await setExchangeCredentials([
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
    ]);
    await setPlans([
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
    ]);
  };

  return (
    <Box pt={insets.top} pb={insets.bottom} pl={insets.left} pr={insets.right}>
      <Stack.Screen options={{ title: 'デバッグ', headerShown: false }} />

      <Text>デバッグ</Text>
      <Text>テストテストテストテスト</Text>

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
      </VStack>

      <TickerInfos />
    </Box>
  );
}
