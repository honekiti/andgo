import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  Box,
  Button,
  Icon,
  Image,
  ButtonText,
  ChevronRightIcon,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  CloseIcon,
  Heading,
  Text,
  ButtonGroup,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  Switch,
  HStack,
  Pressable,
  SafeAreaView,
} from '@gluestack-ui/themed';
import { Stack, Link, useRouter } from 'expo-router';
import { white, unclearWhite, darkGrey, red } from '../constants/Colors';
import { hardReset } from '../services/advanced-service';
import { accountAtom } from '../services/account-service';

export default function ConfigScreen() {
  const [account, setAccount] = useAtom(accountAtom);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const router = useRouter();

  const handleSwitchDryRun = () => {
    setAccount(async (v) => {
      const prev = await v;
      return { ...prev, dryRun: !prev.dryRun };
    });
  };

  return (
    <Box flex={1} bgColor={darkGrey}>
      <Stack.Screen
        options={{
          title: '設定',
          presentation: 'card',
        }}
      />

      <Link href="/exchanges" asChild>
        <Button height="$16" bg={darkGrey} justifyContent="space-between" borderBottomWidth={0.3} borderColor={unclearWhite}>
          <ButtonText textAlign="left">取引所</ButtonText>
          <Icon as={ChevronRightIcon} size="lg" color={white} />
        </Button>
      </Link>

      <Link href="/(onbording)/terms-of-service" asChild>
        <Button height="$16" bg={darkGrey} justifyContent="space-between" borderBottomWidth={0.3} borderColor={unclearWhite}>
          <ButtonText textAlign="left">利用規約</ButtonText>
          <Icon as={ChevronRightIcon} size="lg" color={white} />
        </Button>
      </Link>

      <Link href="https://tsumitatetoko.com/news" asChild>
        <Button height="$16" bg={darkGrey} justifyContent="space-between" borderBottomWidth={0.3} borderColor={unclearWhite}>
          <ButtonText textAlign="left">最新リリース情報</ButtonText>
          <Icon as={ChevronRightIcon} size="lg" color={white} />
        </Button>
      </Link>

      <Box mt="$4" flex={1} alignItems="center">
        <Image
          size="xs"
          bgColor="#0000"
          style={{ width: '40%', height: '20%' }}
          resizeMode="contain"
          source={require('../../assets/images/logo.png')}
          alt="logo"
        />
      </Box>

      <Box mx="$4" bg="$secondary0">
        <Alert mx="$4" my="$4" action="error" variant="solid">
          <AlertIcon as={InfoIcon} mr="$3" />
          <AlertText>内容が分かっている方のための機能です</AlertText>
        </Alert>

        <Pressable onPress={handleSwitchDryRun}>
          <HStack mx="$4" mt="$4" mb="$6" py="$2" justifyContent="center" alignItems="center">
            <Switch size="md" value={account.dryRun} onChange={handleSwitchDryRun} />
            <Text bold={true} ml="$4">
              疑似購入モード
            </Text>
          </HStack>
        </Pressable>

        <Button mx="$4" mb="$4" height="$12" bg={red} onPress={() => setShowResetDialog(true)}>
          <ButtonText color={white}>初期化する</ButtonText>
        </Button>
      </Box>

      <AlertDialog
        isOpen={showResetDialog}
        onClose={() => {
          setShowResetDialog(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">初期化の確認</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">設定情報を消去します。取引所資産が消えることはありません。</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowResetDialog(false);
                }}
              >
                <ButtonText>キャンセル</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={async () => {
                  await hardReset();
                  setShowResetDialog(false);
                  router.replace('/');
                }}
              >
                <ButtonText>初期化する</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 下だけセーフエリアを有効にする */}
      <SafeAreaView />
    </Box>
  );
}
