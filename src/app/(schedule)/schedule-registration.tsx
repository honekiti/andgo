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
  useToast,
  Toast,
  ToastTitle,
} from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey } from '../../constants/Colors';
import { useFocusEffect, router } from 'expo-router';
import {
  loadSchedules,
  saveScheduels,
  getExchangeName,
  getPlan,
  getModifiedRefAt,
  getNextIndexFromNow,
  getNextAtByIndex,
} from '../../services/schedule-service';
import { Schedule, ExchangeCredential } from '../../models';
import { genId } from '../../utils/crypto';
import type { ExchangeId, PlanId } from '../../models';
import { PLANS, DAY_OF_WEEK_OPTIONS, DATE_OPTIONS, HOUR_OPTIONS, MINUTE_OPTIONS } from '../../master';
import { loadCredentials } from '../../services/exchange-credential-service';

/**
 * 積立プラン作成画面
 */
export default function ScheduleRegistrationScreen() {
  const toast = useToast();
  const [credentials, setCredentials] = useState<ExchangeCredential[]>([]);
  const exchanges = credentials.map((credential) => ({
    id: credential.id,
    name: getExchangeName(credential),
  }));

  // form data
  const [exchangeId, setExchangeId] = useState<ExchangeId>('unknown');
  const [planId, setPlanId] = useState<PlanId>('MONTHLY');
  // planId === 'WEEKLY' の場合のみ有効
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  // planId === 'MONTHLY' の場合のみ有効
  const [date, setDate] = useState<number>(1);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  const handlePressAddSchedule = async () => {
    const plan = getPlan(planId);
    const refAt = getModifiedRefAt({ refAt: new Date().getTime(), date, dayOfWeek, hours: hour, minutes: minute });
    const newSuchedule: Schedule = {
      id: genId(),
      exchangeId,
      quoteAmount: 123,
      intervalUnit: plan.intervalUnit,
      interval: plan.interval,
      status: {
        enabled: true,
        refAt,
        nextIndex: 0,
        nextAt: 0,
      },
    };
    // 次回発動時刻に調整
    const nextIndex = getNextIndexFromNow(newSuchedule, new Date().getTime());
    const nextAt = getNextAtByIndex(newSuchedule, nextIndex);

    const schedules = await loadSchedules();

    // 一番後ろに追加
    const updatedSchedule = [...schedules, { ...newSuchedule, nextIndex, nextAt }];

    await saveScheduels(updatedSchedule);

    // 閉じる
    router.back();
  };

  useFocusEffect(
    useCallback(() => {
      loadCredentials().then((credentials) => {
        if (credentials.length === 0) {
          // 取引所連携がない場合は、モーダルを閉じる
          toast.show({
            render: () => (
              <Toast action="error">
                <ToastTitle>取引所連携エラー</ToastTitle>
              </Toast>
            ),
          });
          router.back();
        } else {
          setCredentials(credentials);
        }
      });
    }, [toast.show]),
  );

  return (
    <Box h="$full" w="$full" bg={darkGrey} justifyContent="space-between">
      <ScrollView>
        <VStack space="3xl" p="$4">
          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>取引所</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={(v) => setExchangeId(v as ExchangeId)}>
              <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                <SelectInput color={white} placeholder="選択してください" />
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
                <Select onValueChange={(v) => setPlanId(v as PlanId)}>
                  <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                    <SelectInput color={white} placeholder="毎週" />
                    <SelectIcon mr="$3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal h="$20" w="$40">
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {PLANS.map((plan) => (
                        <SelectItem key={plan.id} label={plan.name} value={plan.id} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
              <Box w="49%">
                {planId === 'WEEKLY' && (
                  <Select onValueChange={(v) => setDayOfWeek(Number(v))}>
                    <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                      <SelectInput color={white} />
                      <SelectIcon mr="$3" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {DAY_OF_WEEK_OPTIONS.map((o) => (
                          <SelectItem key={o.value} label={o.label} value={`${o.value}`} />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
                {planId === 'MONTHLY' && (
                  <Select onValueChange={(v) => setDate(Number(v))}>
                    <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                      <SelectInput color={white} />
                      <SelectIcon mr="$3" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {DATE_OPTIONS.map((o) => (
                          <SelectItem key={o.value} label={o.label} value={`${o.value}`} />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              </Box>
            </HStack>
          </FormControl>

          <FormControl size="md" isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText color={white}>開始日時</FormControlLabelText>
            </FormControlLabel>
            <HStack justifyContent="space-between">
              <Box w="49%">
                <Select onValueChange={(v) => setHour(Number(v))}>
                  <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                    <SelectInput color={white} placeholder="12時" />
                    <SelectIcon mr="$3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal h="$20" w="$40">
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {HOUR_OPTIONS.map((o) => (
                        <SelectItem key={o.value} label={o.label} value={`${o.value}`} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
              <Box w="49%">
                <Select onValueChange={(v) => setMinute(Number(v))}>
                  <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                    <SelectInput color={white} placeholder="0分" />
                    <SelectIcon mr="$3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {MINUTE_OPTIONS.map((o) => (
                        <SelectItem key={o.value} label={o.label} value={`${o.value}`} />
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
                <InputField color={white} placeholder="10,000" />
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
        <Button
          onPress={handlePressAddSchedule}
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
      </Box>
    </Box>
  );
}
