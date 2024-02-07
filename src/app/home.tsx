import { useCallback, useState } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { Box, Button, ButtonIcon, ButtonText, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsIcon, ArrowRightIcon, AddIcon, RemoveIcon, CalendarDaysIcon, PaperclipIcon, Image } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey } from '../constants/Colors';
import CalenderInfo from '../components/ClenderInfo';
import AccumulateInfo from '../components/AccumulateInfo';
import { Schedule } from '../models';
import { saveScheduels, loadSchedules } from '../services/schedule-service';
import { genId } from '../utils/crypto';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handlePressAddSchedule = async () => {
    const dummySuchedule: Schedule = {
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

    const updatedSchedule = [...schedules, dummySuchedule];

    await saveScheduels(updatedSchedule);

    setSchedules(updatedSchedule);
  };

  const handleReset = async () => {
    await saveScheduels([]);
    setSchedules([]);
  };

  useFocusEffect(
    useCallback(() => {
      loadSchedules().then((schedules) => {
        setSchedules(schedules);
      });
    }, []),
  );

  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box pt={insets.top} pb={insets.bottom} pl={insets.left} pr={insets.right} bg="#000">
      <Box h="$64" p="$3" display="flex" flexDirection="column">
        <Box h="50%" display="flex" flexDirection="column">
          <Box h="40%" display="flex" flexDirection="row">
            <Box w="80%" justifyContent="flex-end">
              <Text color={white} bold>
                積立BTC
              </Text>
            </Box>
            <Box w="20%" justifyContent="flex-end" alignItems="flex-end">
              <Link href="/config" asChild>
                <Button borderRadius="$full" p="$3.5">
                  <ButtonIcon as={SettingsIcon} />
                </Button>
              </Link>
            </Box>
          </Box>

          <Box h="60%">
            <Box h="50%" alignItems="center" display="flex" flexDirection="row">
              <Text color={white} bold>
                31,000,000
              </Text>
              <Text color={unclearWhite}>円</Text>
            </Box>
            <Box h="50%" display="flex" flexDirection="row">
              <Image
                size="2xs"
                bgColor="#0000"
                resizeMode="contain"
                source={require('../assets/images/bit-coin-line.png')}
                alt="bit-coin-line-logo"
              />
              <Text color={white} fontSize={13}>
                0.12300000
              </Text>
            </Box>
          </Box>
        </Box>

        <Box h="50%" w="100%" display="flex" flexDirection="row" justifyContent="space-between">
          <Box h="90%" w="49%" p="$2" borderWidth={1} borderColor={unclearWhite} rounded="$md">
            <Box h="50%" justifyContent="space-between" alignItems="center" display="flex" flexDirection="row">
              <Text w="75%" fontSize={18} color={white} fontWeight="500">
                運用損益
              </Text>
              <AddIcon as={ArrowRightIcon} size="lg" color={white} />
            </Box>
            <Text fontSize={13} color={white}>
              現在、表示する情報はありません
            </Text>
          </Box>
          <Box h="90%" w="49%" p="$2" borderWidth={1} borderColor={unclearWhite} rounded="$md">
            <Box h="50%" justifyContent="center">
              <Text w="75%" fontSize={18} color={white} fontWeight="500">
                取引所残高
              </Text>
            </Box>
            <Text fontSize={13} color={white}>
              現在、表示する情報はありません
            </Text>
          </Box>
        </Box>
      </Box>

      <ScrollView>
        <Box h="auto" w="100%" bg={darkGrey} rounded="$3xl">
          <Box h="$7" justifyContent="center" alignItems="center">
            <AddIcon as={RemoveIcon} size="xl" />
          </Box>
          <Box h="$11" w="100%" display="flex" flexDirection="row" alignItems="center">
            <Pressable w="50%" onPress={() => setActiveTab(0)}>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <AddIcon as={CalendarDaysIcon} size="md" color={white} mr="$1" />
                <Text color={white} fontWeight="500">
                  カレンダー
                </Text>
              </Box>
            </Pressable>
            <Pressable w="50%" onPress={() => setActiveTab(1)}>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <AddIcon as={PaperclipIcon} size="md" color={white} mr="$1" />
                <Text color={white} fontWeight="500">
                  積立プラン
                </Text>
              </Box>
            </Pressable>
          </Box>
          {activeTab === 0 && <CalenderInfo />}
          {activeTab === 1 && <AccumulateInfo />}
        </Box>
      </ScrollView>

      {/* <ScheduleList schedules={schedules} />

      <Button onPress={handlePressAddSchedule}>
        <ButtonText>スケジュールの追加</ButtonText>
      </Button>

      <Button onPress={handleReset}>
        <ButtonText>リセット</ButtonText>
      </Button> */}
    </Box>
  );
}
