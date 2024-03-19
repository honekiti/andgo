import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { useFocusEffect, useRouter } from 'expo-router';
import { loadableAccountAtom } from '../services/account-service';

const DEBUG_SCREEN = !!process.env.EXPO_PUBLIC_DEBUG_SCREEN;
export default function IndexScreen() {
  const account = useAtomValue(loadableAccountAtom);
  const router = useRouter();

  // 同意にリアクティブに反応しホーム画面に遷移する
  useFocusEffect(
    useCallback(() => {
      console.log('DEBUG_SCREEN:', DEBUG_SCREEN);
      console.log('account:', account);

      if (DEBUG_SCREEN) {
        // デバッグ画面に遷移する
        router.replace('/debug');
      } else {
        if (account.state === 'hasData') {
          if (account.data.agreement) {
            // ホーム画面に遷移する
            router.replace('/home');
          } else {
            // チュートリアル画面に遷移する
            router.replace('/tutorial');
          }
        }
      }
    }, [account, router.replace]),
  );

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
            <ButtonText>積立プラン編集画面(PLAN1)</ButtonText>
          </Button>
        </Link>

        <Link href="/plans/DEBUG_PLAN2" asChild>
          <Button borderRadius="$full">
            <ButtonText>積立プラン編集画面(PLAN2)</ButtonText>
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
