import { Link } from 'expo-router';
import { Box, Button, CheckCircleIcon, CloseCircleIcon, HStack, Icon, Text, VStack, Image } from '@gluestack-ui/themed';
import type { Plan } from '../models';
import { green, lightGrey, red, unclearWhite, white, btnFalse } from '../constants/Colors';
import { getExchange, useRefBtcAmount } from '../services/exchange-service';
import { getPlanType, getRefAtDetails } from '../services/plan-service';
import { DAY_OF_WEEK_OPTIONS } from '../master';

export type PlanItemProps = {
  item: Plan;
};

export default function PlanItem(props: PlanItemProps) {
  const exchange = getExchange(props.item.exchangeId);
  const planType = getPlanType(props.item.planTypeId);
  const refAtDetails = getRefAtDetails(props.item);
  const btnColor = props.item.status.enabled ? lightGrey : btnFalse;
  const refBtcAmount = useRefBtcAmount(props.item.exchangeId, props.item.quoteAmount);

  return (
    <Box justifyContent="center">
      <Link href="/schedule-edit" asChild>
        <Button h="auto" w="100%" bg={btnColor} rounded="$lg" mb="$2">
          <HStack w="$80" justifyContent="space-between" alignItems="center" px="$2" py="$5">
            <Box>
              <HStack space="xs" alignItems="center">
                {props.item.status.enabled ? (
                  <Icon as={CheckCircleIcon} size="sm" color={green} />
                ) : (
                  <Icon as={CloseCircleIcon} size="sm" color={red} />
                )}
                <Text color={white} fontSize={19} bold pb="$1">
                  {exchange.name}
                </Text>
              </HStack>
              {props.item.status.enabled ? (
                <HStack space="xs">
                  <Text color={unclearWhite} fontSize={13}>
                    {planType.name}
                  </Text>
                  {props.item.planTypeId !== 'DAILY' && (
                    <Text color={unclearWhite} fontSize={13}>
                      {props.item.planTypeId === 'WEEKLY' && DAY_OF_WEEK_OPTIONS[refAtDetails.dayOfWeek].label}
                      {props.item.planTypeId === 'MONTHLY' && (
                        <Text color={unclearWhite} fontSize={13}>
                          {refAtDetails.date}日
                        </Text>
                      )}
                    </Text>
                  )}
                  <Text color={unclearWhite} fontSize={13}>
                    -
                  </Text>
                  <Text color={unclearWhite} fontSize={13}>
                    {refAtDetails.hour}:{refAtDetails.minute.toString().padStart(2, '0')}
                  </Text>
                </HStack>
              ) : (
                <Text>停止中</Text>
              )}
            </Box>
            <VStack space="xs" alignItems="flex-end">
              <HStack>
                <Text color={white} fontSize={19}>
                  {JSON.stringify(props.item.quoteAmount)}
                </Text>
                <Text color={white} fontSize={13} pl="$1">
                  円
                </Text>
              </HStack>
              <HStack space="xs" alignItems="center">
                <Text color={white} fontSize={11}>
                  現在レートで
                </Text>
                <Image
                  h="$4"
                  w="$4"
                  bg="#0000"
                  resizeMode="contain"
                  source={require('../../assets/images/bit-coin-line.png')}
                  alt="bit-coin-line-logo"
                />
                <Text>
                  <Text color={white} fontSize={11}>
                    {refBtcAmount.refBtcAmountStr !== undefined ? refBtcAmount.refBtcAmountStr : '---'}
                  </Text>
                  <Text color={unclearWhite} fontSize={11}>
                    {refBtcAmount.extraZerosStr !== undefined ? refBtcAmount.extraZerosStr : ''}
                  </Text>
                </Text>
                <Text color={white} fontSize={11}>
                  相当
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Button>
      </Link>
    </Box>
  );
}
