import { format, getYear, getMonth, getDate, getDay } from 'date-fns';
import { Box, HStack, Text, VStack, Pressable, useToast, Toast, ToastTitle } from '@gluestack-ui/themed';
import { white, lightGrey, green, red, unclearWhite, darkGrey } from '../constants/Colors';
import { DAY_OF_WEEK_OPTIONS, RESULT_LABELS } from '../master';
import { getExchange } from '../services/exchange-service';

import type { AggregatedCalendarEvent, CalendarEvent } from '../models';

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
    <HStack space="xs">
      <Text fontSize={13}>{exchange.name}</Text>
      <Text fontSize={13}>-</Text>
      <Text fontSize={13} pr="$1">
        {hoursMinutes}
      </Text>
      <Text fontSize={18} bold>
        {props.event.quoteAmount.toLocaleString()}
      </Text>
      <Text fontSize={13}>円</Text>
      <Pressable onPress={handlePress}>
        <Box h="auto" w="auto" bg={resultBgColor} rounded="$md" px="$1.5" ml="$1">
          <Text fontSize={12} color={white}>
            {resultLabel}
          </Text>
        </Box>
      </Pressable>
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
      <HStack justifyContent="space-between" alignItems="center" py="$5" px="$4" borderBottomWidth={0.5} borderColor={lightGrey}>
        <Box alignItems="center">
          <Text fontSize={10}>
            {year}.{month}
          </Text>
          <Box h="$12" w="$12" rounded="$lg" alignItems="center" bg={lightGrey}>
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
              <Text fontSize={13}>現在</Text>
              <Text fontSize={13}>{format(new Date(), 'HH:mm')}</Text>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
}
