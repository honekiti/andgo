import { useState, useCallback } from 'react';
import { useFocusEffect, Link } from 'expo-router';
import { Box, Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsIcon } from '@gluestack-ui/themed';
import ScheduleList from '../components/ScheduleList';
import { loadSchedules, saveScheduels } from '../services/schedule-service';
import { Schedule } from '../models';
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

  return (
    <Box pt={insets.top} pb={insets.bottom} pl={insets.left} pr={insets.right}>
      <Link href="/config" asChild>
        <Button borderRadius="$full" p="$3.5">
          <ButtonIcon as={SettingsIcon} />
        </Button>
      </Link>
      <ScheduleList schedules={schedules} />

      <Button onPress={handlePressAddSchedule}>
        <ButtonText>スケジュールの追加</ButtonText>
      </Button>
      <Button onPress={handleReset}>
        <ButtonText>リセット</ButtonText>
      </Button>
    </Box>
  );
}
