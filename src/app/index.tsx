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

  return null;
}
