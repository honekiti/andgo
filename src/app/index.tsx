import { Link, Stack } from 'expo-router';
import { Box, Button, ButtonText, VStack, useToast, Toast, ToastTitle } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@gluestack-ui/themed';
import { savePlans } from '../services/plan-service';
import { saveCredentials } from '../services/exchange-credential-service';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const handleReset = async (withFixtures: boolean) => {
    if (!withFixtures) {
      await saveCredentials([]);
      await savePlans([]);

      return;
    }

    await saveCredentials([
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
    await savePlans([
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
    ]);

    toast.show({
      render: () => (
        <Toast>
          <ToastTitle>データを初期化しました</ToastTitle>
        </Toast>
      ),
    });
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
    </Box>
  );
}
