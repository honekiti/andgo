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
} from '@gluestack-ui/themed';

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
    <Box h="$full" w="$full">
      <VStack space="lg">
        <FormControl size="md" isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>取引所</FormControlLabelText>
          </FormControlLabel>
          <Select onValueChange={(v) => setSelectedExchangeId(v)}>
            <SelectTrigger variant="outline" size="md">
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

        <FormControl size="md" isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>APIキー</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="発行したAPIキーを入力" />
          </Input>
        </FormControl>

        <FormControl size="md" isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>APIシークレット</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="発行したAPIシークレットを入力" />
          </Input>
        </FormControl>
      </VStack>
    </Box>
  );
}
