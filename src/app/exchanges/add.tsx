import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  Box,
  VStack,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectContent,
  SelectItem,
  Icon,
  Image,
  ChevronDownIcon,
  Text,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  ScrollView,
  Divider,
  ChevronRightIcon,
  useToast,
  Toast,
  ToastTitle,
} from '@gluestack-ui/themed';
import { Stack, Link, router } from 'expo-router';
import { white, unclearWhite, darkGrey, lightGrey } from '../../constants/Colors';
import { exchangeCredentialsAtom, getExchange } from '../../services/exchange-service';
import type { ExchangeCredential, ExchangeId } from '../../models';
import { EXCHANGES } from '../../master';
import { getPermissionsStatus } from '../../services/exchange-api-service/universal';

/**
 * 取引所連携画面
 */
export default function ExchangeRegistrationScreen() {
  const toast = useToast();
  const [credentials, setCredentials] = useAtom(exchangeCredentialsAtom);
  const [selectedExchangeId, setSelectedExchangeId] = useState<ExchangeId>('UNKNOWN');

  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const handlePressAddCredential = async () => {
    const newCredential: ExchangeCredential = {
      exchangeId: selectedExchangeId,
      apiKey,
      apiSecret,
    };
    const permissionIsOk = await getPermissionsStatus(newCredential);
    if (permissionIsOk) {
      const updatedCredentials = [...credentials, newCredential];
      await setCredentials(updatedCredentials);
      toast.show({
        render: () => (
          <Toast action="success">
            <ToastTitle>取引所を連携しました</ToastTitle>
          </Toast>
        ),
      });

      // ホーム画面まで戻る
      router.replace('/home');
    } else {
      toast.show({
        render: () => (
          <Toast action="error">
            <ToastTitle>エラーが発生しました</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  return (
    <Box h="$full" w="$full" bg={darkGrey} justifyContent="space-between">
      <Stack.Screen
        options={{
          title: '取引所連携',
          presentation: 'card',
        }}
      />

      <ScrollView h="auto">
        <VStack space="3xl" p="$4">
          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>取引所</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={(v) => setSelectedExchangeId(v as ExchangeId)}>
              <SelectTrigger variant="outline" size="md" borderWidth={0} bg={lightGrey}>
                <SelectInput color={white} placeholder="選択してください" />
                <SelectIcon mr="$3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>

                  {EXCHANGES.map((exchange) => (
                    <SelectItem key={exchange.id} label={exchange.name} value={exchange.id} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

          {selectedExchangeId !== 'UNKNOWN' && (
            <Box h="auto" w="$full" bg="#000" rounded="$md" alignItems="center" p="$4">
              <Image size="xs" bgColor="#0000" resizeMode="contain" source={require('../../../assets/images/key-fill.png')} alt="key-fill-logo" />
              <Text color={white} fontSize={14} py="$2">
                APIキーを発行してください
              </Text>
              <Divider bg={unclearWhite} />
              <Text color={white} bold p="$2">
                {getExchange(selectedExchangeId).name}
              </Text>
              <Text color={white} fontSize={13}>
                {getExchange(selectedExchangeId).name}へログインし、「APIキーの発行」メニューで「参照」「取引」の権限を選択して、APIを発行してください
              </Text>
              <VStack space="md" pt="$2">
                <Link href="https://bitbank.cc/">
                  <Box
                    h="$12"
                    w="100%"
                    borderWidth={0.5}
                    borderColor={white}
                    rounded="$full"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px="$4"
                  >
                    <Icon as={ChevronRightIcon} size="md" color="#0000" />
                    <Text color={white} bold>
                      {getExchange(selectedExchangeId).name}サイト
                    </Text>
                    <Icon as={ChevronRightIcon} size="md" color={white} />
                  </Box>
                </Link>
                <Link href="https://tsumitatetoko.com/api-register-bitbank">
                  <Box
                    h="$12"
                    w="100%"
                    borderWidth={0.5}
                    borderColor={white}
                    rounded="$full"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px="$4"
                  >
                    <Icon as={ChevronRightIcon} size="md" color="#0000" />
                    <Text color={white} bold>
                      チュートリアル
                    </Text>
                    <Icon as={ChevronRightIcon} size="md" color={white} />
                  </Box>
                </Link>
              </VStack>
            </Box>
          )}

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>APIキー</FormControlLabelText>
            </FormControlLabel>
            <Input borderWidth={0} bg={lightGrey}>
              <InputField color={white} placeholder="発行したAPIキーを入力" value={apiKey} onChangeText={setApiKey} />
            </Input>
          </FormControl>

          <FormControl size="md" isRequired={true} pb="$96">
            <FormControlLabel>
              <FormControlLabelText color={white}>APIシークレット</FormControlLabelText>
            </FormControlLabel>
            <Input borderWidth={0} bg={lightGrey}>
              <InputField color={white} placeholder="発行したAPIシークレットを入力" value={apiSecret} onChangeText={setApiSecret} />
            </Input>
          </FormControl>
        </VStack>
      </ScrollView>

      <Box borderTopWidth={0.5} borderColor={unclearWhite} px="$4" pt="$3" pb="$7" alignItems="center">
        <Button
          onPress={() => handlePressAddCredential()}
          w="100%"
          size="lg"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          rounded="$lg"
          bgColor="#f97316"
        >
          <ButtonText>連携する</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
