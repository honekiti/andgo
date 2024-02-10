import { useState } from 'react';
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
  ChevronDownIcon,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  ScrollView,
  useToast,
  Toast,
  ToastTitle,
} from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey } from '../../constants/Colors';
import { router } from 'expo-router';
import { loadCredentials, saveCredentials } from '../../services/exchange-credential-service';
import { ExchangeCredential, ExchangeId } from '../../models';
import { EXCHANGES } from '../../master';

/**
 * 取引所連携画面
 */

export default function ExchangeRegistrationScreen() {
  const toast = useToast();
  const [exchangeId, setExchangeId] = useState<ExchangeId>('unknown');
  const [apiKey, setApiKey] = useState<string>('');
  const [apiSecret, setApiSecret] = useState<string>('');

  const canSubmit = exchangeId !== 'unknown' && apiKey && apiSecret;

  const handlePressAddCredential = async () => {
    const credentials = await loadCredentials();
    const isAlreadyRegistered = credentials.some((c) => c.id === exchangeId);

    if (isAlreadyRegistered) {
      toast.show({
        render: () => (
          <Toast action="error">
            <ToastTitle>指定した取引所は既に連携済みです</ToastTitle>
          </Toast>
        ),
      });

      return;
    }

    const newCredential: ExchangeCredential = {
      id: exchangeId,
      apiKey,
      apiSecret,
    };

    const updatedCredentials = [...credentials, newCredential];

    await saveCredentials(updatedCredentials);

    toast.show({
      render: () => (
        <Toast action="success">
          <ToastTitle>取引所を連携しました</ToastTitle>
        </Toast>
      ),
    });

    router.back();
  };

  return (
    <Box h="$full" w="$full" bg={darkGrey} justifyContent="space-between">
      <ScrollView h="auto">
        <VStack space="3xl" p="$4">
          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>取引所</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={(v) => setExchangeId(v as ExchangeId)}>
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

                  {EXCHANGES.filter((exchange) => exchange.id !== 'unknown').map((exchange) => (
                    <SelectItem key={exchange.id} label={exchange.name} value={exchange.id} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

          {/* {selectedExchangeId && (
            <Box h="auto" w="$full" bg="#000" rounded="$md" alignItems="center" p="$4">
              =======
              <Image size="xs" bgColor="#0000" resizeMode="contain" source={require('../../assets/images/key-fill.png')} alt="key-fill-logo" />
              <Text color={white} fontSize={14} py="$2">
                APIキーを発行してください
              </Text>
              <Divider bg={unclearWhite} />
              <Text color={white} bold p="$2">
                {selectedExchangeId}
              </Text>
              <Text color={white} fontSize={13}>
                {selectedExchangeId}へログインし、「APIキーの発行」メニューで「参照」「取引」の権限を選択して、APIを発行してください
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
                      {selectedExchangeId ? getExchangeName(selectedExchangeId) : '取引所'}サイト
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
          )} */}

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>APIキー</FormControlLabelText>
            </FormControlLabel>
            <Input borderWidth={0} bg={lightGrey}>
              <InputField color={white} placeholder="発行したAPIキーを入力" value={apiKey} onChangeText={setApiKey} />
            </Input>
          </FormControl>

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>APIシークレット</FormControlLabelText>
            </FormControlLabel>
            <Input borderWidth={0} bg={lightGrey}>
              <InputField
                textContentType="none" // for iOS (disable password manager)
                importantForAutofill="no" // for Android
                color={white}
                placeholder="発行したAPIシークレットを入力"
                value={apiSecret}
                onChangeText={setApiSecret}
              />
            </Input>
          </FormControl>
        </VStack>
      </ScrollView>

      <Box borderTopWidth={0.5} borderColor={unclearWhite} px="$4" pt="$3" pb="$7" alignItems="center">
        <Button
          onPress={handlePressAddCredential}
          w="100%"
          size="lg"
          variant="solid"
          action="primary"
          isDisabled={!canSubmit}
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
