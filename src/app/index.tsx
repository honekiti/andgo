import { Link } from 'expo-router';
import { Box, Button, ButtonText, VStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@gluestack-ui/themed';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Box pt={insets.top} pb={insets.bottom} pl={insets.left} pr={insets.right}>
      <Text>デバッグ</Text>
      <Text>テストテストテストテスト</Text>

      <VStack space="xs">
        <Link href="/exchange-list" asChild>
          <Button borderRadius="$full">
            <ButtonText>取引所一覧画面</ButtonText>
          </Button>
        </Link>

        <Link href="/exchange-registration" asChild>
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

        <Link href="/schedule-edit" asChild>
          <Button borderRadius="$full">
            <ButtonText>積立プラン編集画面</ButtonText>
          </Button>
        </Link>

        <Link href="/schedule-registration" asChild>
          <Button borderRadius="$full">
            <ButtonText>積立プラン作成画面</ButtonText>
          </Button>
        </Link>

        <Link href="/home" asChild>
          <Button borderRadius="$full">
            <ButtonText>ホーム画面</ButtonText>
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}
