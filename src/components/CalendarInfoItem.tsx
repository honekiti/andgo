import { format, getYear, getMonth, getDate, getDay } from 'date-fns';
import { Box, HStack, Text, VStack, Pressable, useToast, Toast, ToastTitle } from '@gluestack-ui/themed';
import { white, lightGrey, green, red, unclearWhite, darkGrey } from '../constants/Colors';
import { DAY_OF_WEEK_OPTIONS, RESULT_LABELS } from '../master';
import { getExchange } from '../services/exchange-service';
import type { AggregatedCalendarEvent, CalendarEvent } from '../models';

export const ITEM_HEIGHT = 100;

export const EventDetail = (props: { event: CalendarEvent }) => {
  const toast = useToast();
  const exchange = getExchange(props.event.exchangeId);
  const hoursMinutes = format(props.event.orderedAt, 'HH:mm');
  const resultLabel = RESULT_LABELS.find((ele) => ele.value === props.event.result?.status)?.label ?? '';
  const resultBgColor = props.event.result?.status === 'SUCCESS' ? green : red;

  const handlePress = () => {
    if (props.event.result?.status === 'FAILED') {
      const errorCode = props.event.result.errorCode;

      toast.show({
        render: () => (
          <Toast>
            <ToastTitle>エラーコード: {errorCode}</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  return (
    <HStack space="xs" alignItems="center">
      <Text fontSize={13} color={white}>
        {exchange.name}
      </Text>
      <Text fontSize={13} color={white}>
        -
      </Text>
      <Text fontSize={13} pr="$1" color={white}>
        {hoursMinutes}
      </Text>
      <Text fontSize={18} bold color={white} mb="$1">
        {props.event.quoteAmount.toLocaleString()}
      </Text>
      <Text fontSize={13} color={white}>
        円
      </Text>
      {props.event.result !== null && (
        <Pressable onPress={handlePress}>
          <Box h="auto" w="auto" bg={resultBgColor} rounded="$sm" px="$1.5" py="$0.5" ml="$1">
            <Text fontSize={12} color={white} bold>
              {resultLabel}
            </Text>
          </Box>
        </Pressable>
      )}
    </HStack>
  );
};

export type CalendarInfoItemProps = {
  item: AggregatedCalendarEvent;
};

export default function CalendarInfoItem(props: CalendarInfoItemProps) {
  const year = getYear(props.item.yearMonthDate);
  const month = getMonth(props.item.yearMonthDate) + 1;
  const date = getDate(props.item.yearMonthDate);
  const day = getDay(props.item.yearMonthDate);
  const dayLabel = DAY_OF_WEEK_OPTIONS.find((ele) => ele.value === day)?.shortLabel ?? '';

  return (
    <>
      <HStack h={ITEM_HEIGHT} justifyContent="space-between" alignItems="center" py="$5" px="$4" borderBottomWidth={0.5} borderColor={lightGrey}>
        <Box alignItems="center">
          <Text mb="$1" fontSize={10} color={white}>
            {year}.{month}
          </Text>
          <Box h="$12" w="$12" rounded="$lg" alignItems="center" justifyContent="center" bg={lightGrey}>
            <Text color={white} fontSize={11}>
              {dayLabel}
            </Text>
            <Text color={white} fontSize={16} bold>
              {date}
            </Text>
          </Box>
        </Box>

        <VStack space="xs" alignItems="flex-end">
          {props.item.calendarEvents.map((e) => (
            <EventDetail key={e.id} event={e} />
          ))}
        </VStack>
      </HStack>

      {props.item.isLastOrder && (
        <Box alignItems="center" justifyContent="center">
          <Box h="$0.5" w="100%" bg={unclearWhite} position="absolute" />
          <Box h="auto" w="auto" borderWidth={1} borderColor={unclearWhite} rounded="$full" px="$3" bg={darkGrey}>
            <HStack space="xs">
              <Text fontSize={13} color={white}>
                現在
              </Text>
              <Text fontSize={13} color={white}>
                {format(new Date(), 'HH:mm')}
              </Text>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
}
