import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Button, ButtonText, CheckCircleIcon, CloseCircleIcon, HStack, Icon, LinkText, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey, red, green } from '../constants/Colors';
import { Link } from 'expo-router';
import { genId } from '../utils/crypto';
import { loadSchedules, saveScheduels } from '../services/schedule-service';
import { Schedule } from '../models';

export default function AccumulateInfo() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // このコンポーネントを含む画面にフォーカスが当たった際にスケジュール情報を読み込む
  useFocusEffect(
    useCallback(() => {
      loadSchedules().then((schedules) => {
        setSchedules(schedules);
      });
    }, []),
  );

  // TODO: schedules.length > 0 の時は<ScheduleList schedules={schedules} /> をレンダリングする

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box h="$0.5" w="50%" bg={unclearWhite} rounded="$full" />
        <Box h="$0.5" w="50%" bg={white} rounded="$full" />
      </Box>
      {/* ↓ 取引所連携前 ↓ */}
      {/* <Box h="auto" alignItems="center" my="$7">
        <Box h="$20" w="$20" bg="#f003" rounded={'$full'} />
        <Text mt="$2">暗号資産(仮想通貨)取引所と</Text>
        <Text>連携しましょう</Text>
      </Box>

      <Box h="auto" alignItems="center" mb="$7">
        <Link href="/exchange-registration" asChild>
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
      </Box> */}
      {/* ↑ 取引所連携前 ↑ */}
      {/* ↓ 取引所連携後 ↓ */}
      <Box h="auto" w="$full" justifyContent="space-between">
        <ScrollView h="auto">
          <VStack space="sm" p="$4">
            <Link href="/schedule-edit" asChild>
              <Button h="auto" w="100%" bg={lightGrey} rounded="$lg">
                <HStack w="$80" justifyContent="space-between" alignItems="center" px="$2" py="$5">
                  <Box>
                    <HStack space="xs" alignItems="center">
                      <Icon as={CheckCircleIcon} size="sm" color={green} />
                      <Text color={white} fontSize={19} bold pb="$1">
                        Kraken
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={unclearWhite} fontSize={13}>
                        毎日
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        -
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        18:00
                      </Text>
                    </HStack>
                  </Box>
                  <VStack space="xs" alignItems="flex-end">
                    <HStack>
                      <Text color={white} fontSize={19}>
                        1,000
                      </Text>
                      <Text color={white} fontSize={13} pl="$1">
                        円
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={white} fontSize={11}>
                        現在レートで＠
                      </Text>
                      <Text color={white} fontSize={11}>
                        0.02300000
                      </Text>
                      <Text color={white} fontSize={11}>
                        相当
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Button>
            </Link>
            <Link href="/schedule-edit" asChild>
              <Button h="auto" w="100%" bg={lightGrey} rounded="$lg">
                <HStack w="$80" justifyContent="space-between" alignItems="center" px="$2" py="$5">
                  <Box>
                    <HStack space="xs" alignItems="center">
                      <Icon as={CheckCircleIcon} size="sm" color={green} />
                      <Text color={white} fontSize={19} bold pb="$1">
                        bitFlyer
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={unclearWhite} fontSize={13}>
                        毎日
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        -
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        18:00
                      </Text>
                    </HStack>
                  </Box>
                  <VStack space="xs" alignItems="flex-end">
                    <HStack>
                      <Text color={white} fontSize={19}>
                        20,000
                      </Text>
                      <Text color={white} fontSize={13} pl="$1">
                        円
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={white} fontSize={11}>
                        現在レートで＠
                      </Text>
                      <Text color={white} fontSize={11}>
                        0.56700000
                      </Text>
                      <Text color={white} fontSize={11}>
                        相当
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Button>
            </Link>
            <Link href="/schedule-edit" asChild>
              <Button h="auto" w="100%" bg="#33333366" rounded="$lg">
                <HStack w="$80" justifyContent="space-between" alignItems="center" px="$2" py="$5">
                  <Box>
                    <HStack space="xs" alignItems="center">
                      <Icon as={CloseCircleIcon} size="sm" color={red} />
                      <Text color={white} fontSize={19} bold pb="$1">
                        GMOコイン
                      </Text>
                    </HStack>
                    {/* <HStack space="xs">
                      <Text color={unclearWhite} fontSize={13}>
                        毎日
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        -
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        18:00
                      </Text>
                    </HStack> */}
                    <Text>停止中</Text>
                  </Box>
                  <VStack space="xs" alignItems="flex-end">
                    <HStack>
                      <Text color={white} fontSize={19}>
                        50,000
                      </Text>
                      <Text color={white} fontSize={13} pl="$1">
                        円
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={white} fontSize={11}>
                        現在レートで＠
                      </Text>
                      <Text color={white} fontSize={11}>
                        0.78900000
                      </Text>
                      <Text color={white} fontSize={11}>
                        相当
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Button>
            </Link>
          </VStack>
        </ScrollView>

        <HStack justifyContent="space-between" alignItems="center" p="$4" mb="$3" borderTopWidth={0.3} borderColor={unclearWhite} bg={darkGrey}>
          <Text color={white}>積立プランを追加しよう</Text>
          <Link href="/schedule-registration" asChild>
            <Button w="$24" size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} rounded="$full">
              <ButtonText>追加</ButtonText>
            </Button>
          </Link>
        </HStack>
      </Box>
      {/* ↑ 取引所連携後 ↑ */}
    </>
  );
}
