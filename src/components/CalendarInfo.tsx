import { useRef } from 'react';
import type { FlatList as FlatListType } from 'react-native';
import { useAtomValue } from 'jotai';
import { Box, Button, ButtonText, HStack, LinkText, Text, VStack, Image, FlatList } from '@gluestack-ui/themed';
import { white, unclearWhite } from '../constants/Colors';
import { Link, useFocusEffect } from 'expo-router';
import { exchangeCredentialsAtom } from '../services/exchange-service';
import { calendarEventsAtom } from '../services/calendar-service';
import CalendarInfoItem, { ITEM_HEIGHT } from './CalendarInfoItem';
import type { AggregatedCalendarEvent } from '../models';

export const NoExchanges = () => {
  return (
    <Box justifyContent="space-between">
      <Box h="auto" alignItems="center" my="$7">
        <Image size="xs" my="$3" resizeMode="contain" source={require('../../assets/images/link.png')} alt="bit-coin-line-logo" />
        <Text mt="$2">暗号資産(仮想通貨)取引所と</Text>
        <Text mb="$7">連携しましょう</Text>
        <Link href="/exchanges/add" asChild>
          <Button
            h="$12"
            w="90%"
            mb="$5"
            size="md"
            variant="outline"
            action="secondary"
            isDisabled={false}
            isFocusVisible={false}
            borderWidth={2}
            rounded="$lg"
          >
            <ButtonText color={white}>取引所と連携する</ButtonText>
          </Button>
        </Link>
        <Link href="https://andgo.notion.site/">
          <LinkText color={white} underline>
            連携する方法を見る
          </LinkText>
        </Link>
      </Box>
    </Box>
  );
};

export default function CalendarInfo() {
  const flatListRef = useRef(null);
  const credentials = useAtomValue(exchangeCredentialsAtom);
  const calendarEvents = useAtomValue(calendarEventsAtom);

  useFocusEffect(() => {
    const index = calendarEvents.findIndex((ele) => ele.isLastOrder);

    setTimeout(() => {
      if (flatListRef.current && index >= 0) {
        (flatListRef.current as FlatListType).scrollToOffset({ offset: ITEM_HEIGHT * index, animated: false });
      }
    }, 100);
  });

  return (
    <Box>
      <HStack h="0.5%">
        <Box h="100%" w="50%" bg={white} rounded="$full" />
        <Box h="100%" w="50%" bg={unclearWhite} rounded="$full" />
      </HStack>

      {credentials.length === 0 ? (
        // 取引所連携前
        <NoExchanges />
      ) : (
        // 取引所連携後
        <VStack h="$full" w="$full">
          {/* type bug: https://github.com/gluestack/gluestack-ui/issues/1041 */}
          <FlatList
            ref={flatListRef}
            data={calendarEvents}
            getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
            renderItem={({ item }) => <CalendarInfoItem item={item as AggregatedCalendarEvent} />}
            keyExtractor={(item) => `${(item as AggregatedCalendarEvent).id}`}
          />
        </VStack>
      )}
    </Box>
  );
}
