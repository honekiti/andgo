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
  Input,
  InputField,
} from '@gluestack-ui/themed';

export default function ExchangeRegistrationScreen() {
  return (
    <Box h="$full" w="$full">
      <VStack>
        <FormControl size="md" isRequired={true}>
          <FormControlLabel>取引所</FormControlLabel>
          <Select>
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
            </SelectContent>
          </SelectPortal>
        </FormControl>

        <FormControl size="md" isRequired={true}>
          <FormControlLabel>APIキー</FormControlLabel>
          <Input>
            <InputField placeholder="発行したAPIキーを入力" />
          </Input>
        </FormControl>

        <FormControl size="md" isRequired={true}>
          <FormControlLabel>APIシークレット</FormControlLabel>
          <Input>
            <InputField placeholder="発行したAPIシークレットを入力" />
          </Input>
        </FormControl>
      </VStack>
    </Box>
  );
}
