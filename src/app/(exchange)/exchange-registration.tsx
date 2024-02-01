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
  Icon,
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
  LinkText,
} from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey } from '../../constants/Colors';
import { Link } from 'expo-router';

/**
 * 取引所連携画面
 */
export default function ExchangeRegistrationScreen() {
  const [exchanges, setExchanges] = useState([
    { id: 'bitflyer', name: 'bitFlyer' },
    { id: 'coincheck', name: 'Coincheck' },
  ]);
  const [selectedExchangeId, setSelectedExchangeId] = useState<string | undefined>(undefined);

  return (
    <Box h="$full" w="$full" bg={darkGrey} justifyContent="space-between">
      <ScrollView>
        <VStack space="3xl" p="$4">
          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>取引所</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={(v) => setSelectedExchangeId(v)}>
              <SelectTrigger variant="outline" size="md" borderWidth={0} bg={lightGrey}>
                <SelectInput placeholder="選択してください" />
                <SelectIcon mr="$3" as={ChevronDownIcon} />
              </SelectTrigger>
            </Select>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>

                {exchanges.map((exchange) => (
                  <SelectItem key={exchange.id} label={exchange.name} value={exchange.id} />
                ))}
              </SelectContent>
            </SelectPortal>
          </FormControl>

          <Box h="auto" w="$full" bg="#000" rounded="$md" alignItems="center" p="$4">
            <Box h="$10" w="$10" bg="#00f" rounded="$full" />
            <Text color={white} fontSize={14} py="$2">
              APIキーを発行してください
            </Text>
            <Divider bg={unclearWhite} />
            <Text color={white} bold p="$2">
              bitbank
            </Text>
            <Text color={white} fontSize={13}>
              bitbankへログインし、「APIキーの発行」メニューで「参照」「取引」の権限を選択して、APIを発行してください
            </Text>
            <VStack space="md" pt="$2">
              <Link href="https://bitbank.cc">
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
                    bitbankサイト
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

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>APIキー</FormControlLabelText>
            </FormControlLabel>
            <Input borderWidth={0} bg={lightGrey}>
              <InputField placeholder="発行したAPIキーを入力" />
            </Input>
          </FormControl>

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>APIシークレット</FormControlLabelText>
            </FormControlLabel>
            <Input borderWidth={0} bg={lightGrey}>
              <InputField placeholder="発行したAPIシークレットを入力" />
            </Input>
          </FormControl>
        </VStack>
      </ScrollView>

      <Box borderTopWidth={0.5} borderColor={unclearWhite} px="$4" pt="$3" pb="$7">
        <Link href="/home">
          <Button size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} rounded="$lg">
            <ButtonText>連携する</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
