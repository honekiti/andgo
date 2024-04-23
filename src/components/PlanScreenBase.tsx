import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
  Switch,
} from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey } from '../constants/Colors';
import { useFocusEffect, router } from 'expo-router';
import { plansAtom, getModifiedRefAt, getNextIndexFromNow, getNextAtByIndex, getRefAtDetails } from '../services/plan-service';
import { exchangeCredentialsAtom, getExchange, getExchangeFromCredential } from '../services/exchange-service';
import { genId } from '../utils/crypto';
import type { Plan, ExchangeCredential, ExchangeId, PlanTypeId, PlanId } from '../models';
import { PLAN_TYPES, DAY_OF_WEEK_OPTIONS, DATE_OPTIONS, HOUR_OPTIONS, MINUTE_OPTIONS } from '../master';
import ExchangeInfo from '../components/ExchangeInfo';
import { store } from '../store';

export const strToNum = (v: string): number => {
  const i = Number(v.replaceAll(',', ''));

  if (Number.isNaN(i)) {
    return 0;
  }

  return i;
};

type PlanScreenBaseProps = {
  targetPlanId?: PlanId;
};

export default function PlanScreenBase(props: PlanScreenBaseProps) {
  const toast = useToast();
  const [credentials, setCredentials] = useState<ExchangeCredential[]>([]);
  const exchangeItems = credentials.map((credential) => ({
    credential,
    exchange: getExchangeFromCredential(credential),
  }));

  // form data
  const [exchangeId, setExchangeId] = useState<ExchangeId>('UNKNOWN');
  const [planTypeId, setPlanTypeId] = useState<PlanTypeId>('MONTHLY');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [quoteAmount, setQuoteAmount] = useState<number>(0);
  // planId === 'WEEKLY' の場合のみ有効
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  // planId === 'MONTHLY' の場合のみ有効
  const [date, setDate] = useState<number>(1);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  const handleSubmit = async () => {
    const refAt = getModifiedRefAt({ refAt: new Date().getTime(), date, dayOfWeek, hours: hour, minutes: minute });
    // 次回発動時刻に調整
    const nextIndex = getNextIndexFromNow(planTypeId, refAt, new Date().getTime());
    const nextAt = getNextAtByIndex(planTypeId, refAt, nextIndex);

    const newPlan: Plan = {
      id: props.targetPlanId ?? genId(),
      exchangeId,
      quoteAmount,
      planTypeId,
      dryRun: false,
      status: {
        enabled: true,
        refAt,
        nextIndex,
        nextAt,
      },
    };

    const plans = await store.get(plansAtom);

    const updatedPlans = [...plans];

    if (props.targetPlanId) {
      // 更新
      plans.splice(
        plans.findIndex((p) => p.id === props.targetPlanId),
        1,
        newPlan,
      );
    } else {
      // 一番後ろに追加
      updatedPlans.push(newPlan);
    }

    await store.set(plansAtom, updatedPlans);

    // 閉じる
    router.back();
  };

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        // 取引所連係情報を読み込む
        const credentials = await store.get(exchangeCredentialsAtom);
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

        // 取引所の初期選択値を連携済取引所の値とする
        setExchangeId(credentials[0].exchangeId);

        // プラン編集の場合は、プラン情報を読み込む
        if (props.targetPlanId) {
          const plans = await store.get(plansAtom);
          const targetPlan = plans.find((p) => p.id === props.targetPlanId);

          console.log('targetPlan', targetPlan);

          if (!targetPlan) {
            toast.show({
              render: () => (
                <Toast action="error">
                  <ToastTitle>プランが見つかりません</ToastTitle>
                </Toast>
              ),
            });
            router.back();
          } else {
            const refAtDetails = getRefAtDetails(targetPlan);

            setExchangeId(targetPlan.exchangeId);
            setPlanTypeId(targetPlan.planTypeId);
            setIsEnabled(targetPlan.status.enabled);

            if (targetPlan.planTypeId === 'WEEKLY') {
              setDayOfWeek(refAtDetails.dayOfWeek);
            }
            if (targetPlan.planTypeId === 'MONTHLY') {
              setDate(refAtDetails.date);
              setHour(refAtDetails.hour);
              setMinute(refAtDetails.minute);
            }
          }
        }
      };

      loadData();
    }, [props.targetPlanId, toast.show]),
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box h="$full" w="$full" bg={darkGrey} justifyContent="space-between">
          <ScrollView>
            <VStack space="3xl" p="$4">
              <FormControl size="md" isRequired={true}>
                <FormControlLabel>
                  <FormControlLabelText color={white}>取引所</FormControlLabelText>
                </FormControlLabel>
                {/* SelectがsetExchangeIdを反映してくれないバグをLazyにレンダリングすることで回避する */}
                {(!props.targetPlanId || exchangeId !== 'UNKNOWN') && (
                  <Select
                    selectedValue={exchangeId}
                    initialLabel={getExchange(exchangeId).name}
                    onValueChange={(v) => setExchangeId(v as ExchangeId)}
                  >
                    <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                      <SelectInput color={white} placeholder="選択してください" />
                      <SelectIcon mr="$3" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent bg="#fffe">
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {exchangeItems.map(({ exchange }) => (
                          <SelectItem key={exchange.id} label={exchange.name} value={exchange.id} />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              </FormControl>

              {exchangeId !== 'UNKNOWN' && <ExchangeInfo exchangeId={exchangeId} />}

              <FormControl size="md" isRequired={true}>
                <FormControlLabel>
                  <FormControlLabelText color={white}>スケジュール</FormControlLabelText>
                </FormControlLabel>
                <HStack justifyContent="space-between">
                  <Box w="49%">
                    <Select onValueChange={(v) => setPlanTypeId(v as PlanTypeId)}>
                      <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                        <SelectInput color={white} placeholder="毎週" />
                        <SelectIcon mr="$3" as={ChevronDownIcon} />
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent bg="#fffe">
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          {PLAN_TYPES.map((planType) => (
                            <SelectItem key={planType.id} label={planType.name} value={planType.id} />
                          ))}
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  </Box>
                  <Box w="49%">
                    {planTypeId === 'WEEKLY' && (
                      <Select onValueChange={(v) => setDayOfWeek(Number(v))}>
                        <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                          <SelectInput color={white} placeholder="未選択" />
                          <SelectIcon mr="$3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent bg="#fffe">
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
                    {planTypeId === 'MONTHLY' && (
                      <Select onValueChange={(v) => setDate(Number(v))}>
                        <SelectTrigger variant="outline" size="md" rounded="$lg" borderWidth={0} bg={lightGrey}>
                          <SelectInput color={white} placeholder="未選択" />
                          <SelectIcon mr="$3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent h="40%" bg="#fffe">
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <ScrollView>
                              {DATE_OPTIONS.map((o) => (
                                <SelectItem key={o.value} label={o.label} value={`${o.value}`} w="$80" />
                              ))}
                            </ScrollView>
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
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent h="40%" bg="#fffe">
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          <ScrollView>
                            {HOUR_OPTIONS.map((o) => (
                              <SelectItem key={o.value} label={o.label} value={`${o.value}`} w="$80" />
                            ))}
                          </ScrollView>
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
                        <SelectContent bg="#fffe">
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
                    <InputField
                      inputMode="numeric"
                      keyboardType="number-pad"
                      autoComplete="off"
                      autoCorrect={false}
                      color={white}
                      placeholder="10,000"
                      value={quoteAmount.toLocaleString()}
                      onChangeText={(v) => setQuoteAmount(strToNum(v))}
                    />
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

              {props.targetPlanId && (
                <HStack justifyContent="space-between">
                  <Text color={white}>積立プランのステータス</Text>
                  <Switch size="sm" isDisabled={false} value={isEnabled} onToggle={() => setIsEnabled(!isEnabled)} />
                </HStack>
              )}

              {props.targetPlanId && (
                <Button size="md" variant="link" action="negative" isDisabled={false} isFocusVisible={false} justifyContent="flex-start">
                  <ButtonText fontSize={13} underline mb="$4">
                    積立プランを削除する
                  </ButtonText>
                </Button>
              )}
            </VStack>
          </ScrollView>
          <Box borderTopWidth={0.5} borderColor={unclearWhite} px="$4" pt="$3" pb="$7" alignItems="center">
            <Button
              onPress={handleSubmit}
              w="100%"
              size="lg"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              rounded="$lg"
            >
              {props.targetPlanId && <ButtonText>作成する</ButtonText>}
              {!props.targetPlanId && <ButtonText>更新する</ButtonText>}
            </Button>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
