import { useCallback, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
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
import { Link, useFocusEffect } from 'expo-router';
import { loadSchedules, saveScheduels } from '../../services/schedule-service';
import { Schedule, ExchangeCredential } from '../../models';
import { genId } from '../../utils/crypto';
import { EXCHANGES } from '../../master';
import { loadCredentials } from '../../services/exchange-credential-service';

/**
 * 積立プラン作成画面
 */
export default function ScheduleRegistrationScreen() {
  // TODO: 取引所連携情報読み込みを有効にしたら、初期値を空配列にする
  const [credentials, setCredentials] = useState<ExchangeCredential[]>([]);
  const exchanges = credentials.map((credential) => ({
    id: credential.id,
    name: EXCHANGES.find((ex) => ex.id === credential.id)?.name ?? 'unknown',
  }));

  const [selectedExchangeId, setSelectedExchangeId] = useState<string | undefined>(undefined);

  const [frequency, setFrequency] = useState([
    { id: 'daily', name: '毎日' },
    { id: 'weekly', name: '毎週' },
    { id: 'monthly', name: '毎月' },
  ]);
  const [selectedFrequencyId, setSelectedFrequencyId] = useState<string | undefined>(undefined);

  const [weeks, setWeeks] = useState([
    { id: 'monday', name: '月曜日' },
    { id: 'tuesday', name: '火曜日' },
    { id: 'wednesday', name: '水曜日' },
    { id: 'thursday', name: '木曜日' },
    { id: 'friday', name: '金曜日' },
    { id: 'saturday', name: '土曜日' },
    { id: 'sunday', name: '日曜日' },
  ]);
  const [selectedWeekId, setSelectedWeekId] = useState<string | undefined>(undefined);

  const [hours, setHours] = useState([
    { id: '0', name: '0時' },
    { id: '1', name: '1時' },
    { id: '2', name: '2時' },
  ]);
  const [selectedHoursId, setSelectedHoursId] = useState<string | undefined>(undefined);

  const [minutes, setMinutes] = useState([
    { id: '0', name: '0分' },
    { id: '1', name: '1分' },
    { id: '2', name: '2分' },
  ]);
  const [selectedMinutesId, setSelectedMinutesId] = useState<string | undefined>(undefined);

  // TODO: 作成ボタン押下時にこの関数を呼び出す
  const handlePressAddSchedule = async () => {
    // TODO: 下記をフォームの入力値に切り替える
    const newSuchedule: Schedule = {
      id: genId(),
      exchangeId: 'bitbank',
      quoteAmount: 123,
      intervalType: 'MINUTES',
      interval: 15,
      status: {
        enabled: false,
        refAt: new Date().getTime(),
        nextIndex: 0,
        nextAt: 0,
      },
    };

    const schedules = await loadSchedules();
    const updatedSchedule = [...schedules, newSuchedule];

    await saveScheduels(updatedSchedule);
  };

  // TODO: 取引所連携情報読み込みを有効にする(コメントアウトを解除する)
  useFocusEffect(
    useCallback(() => {
      loadCredentials().then((credentials) => {
        setCredentials(credentials);
      });
    }, []),
  );

  return (
    <Box h="$full" w="$full" bg={darkGrey} justifyContent="space-between">
      <ScrollView>
        <VStack space="3xl" p="$4">
          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>取引所</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={(v) => setSelectedExchangeId(v)}>
              <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                <SelectInput placeholder="選択してください" />
                <SelectIcon mr="$3" as={ChevronDownIcon} />
              </SelectTrigger>
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
            </Select>
          </FormControl>

          {/* <Box h="auto" w="$full" bg="#000" rounded="$lg">
            <VStack space="md" alignItems="center" py="$4">
              <Box h="$8" w="$8" rounded="$full" bg="#00f" />
              <Text fontSize={12} color={white} bold>
                最低購入量
              </Text>
              <Text fontSize={17} color={white} bold>
                0.00000001
              </Text>
              <Text fontSize={11} color={white}>
                1000円相当
              </Text>
            </VStack>
          </Box> */}

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>スケジュール</FormControlLabelText>
            </FormControlLabel>
            <HStack justifyContent="space-between">
              <Box w="49%">
                <Select onValueChange={(v) => setSelectedFrequencyId(v)}>
                  <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                    <SelectInput placeholder="毎週" />
                    <SelectIcon mr="$3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal h="$20" w="$40">
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {frequency.map((freq) => (
                        <SelectItem key={freq.id} label={freq.name} value={freq.id} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
              <Box w="49%">
                <Select onValueChange={(v) => setSelectedWeekId(v)}>
                  <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                    <SelectInput placeholder="金曜日" />
                    <SelectIcon mr="$3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {weeks.map((week) => (
                        <SelectItem key={week.id} label={week.name} value={week.id} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
            </HStack>
          </FormControl>

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>開始日時</FormControlLabelText>
            </FormControlLabel>
            <HStack justifyContent="space-between">
              <Box w="49%">
                <Select onValueChange={(v) => setSelectedHoursId(v)}>
                  <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                    <SelectInput placeholder="12時" />
                    <SelectIcon mr="$3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal h="$20" w="$40">
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {hours.map((hour) => (
                        <SelectItem key={hour.id} label={hour.name} value={hour.id} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
              <Box w="49%">
                <Select onValueChange={(v) => setSelectedMinutesId(v)}>
                  <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                    <SelectInput placeholder="0分" />
                    <SelectIcon mr="$3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {minutes.map((min) => (
                        <SelectItem key={min.id} label={min.name} value={min.id} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
            </HStack>
          </FormControl>

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>1回あたりの購入額</FormControlLabelText>
            </FormControlLabel>
            <HStack justifyContent="space-between">
              <Input w="93%" rounded="$lg" borderWidth={0} bg={lightGrey}>
                <InputField placeholder="10,000" />
              </Input>
              <VStack reversed={true}>
                <Text w="auto" fontSize={18} color={white}>
                  円
                </Text>
              </VStack>
            </HStack>
            <Text fontSize={13} color={unclearWhite} py="$2">
              ※実際に購入するタイミングでBTC換算額が最低購入量を下回った場合は、購入されません
            </Text>
            <Text fontSize={13} color={unclearWhite}>
              ※成行注文となります。（タイミング）、数量が若干ずれますのでご了承ください
            </Text>
          </FormControl>
        </VStack>
      </ScrollView>
      <Box borderTopWidth={0.5} borderColor={unclearWhite} px="$4" pt="$3" pb="$7" alignItems="center">
        <Link href="/home" asChild>
          <Button
            onPress={() => handlePressAddSchedule()}
            w="100%"
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            rounded="$lg"
          >
            <ButtonText>作成する</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
