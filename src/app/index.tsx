import { useState, useCallback } from 'react';
import { useFocusEffect, Link } from 'expo-router';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import ScheduleList from '../components/ScheduleList';
import { loadSchedules } from '../services/schedule-service';
import { Schedule } from '../models';

export default function HomeScreen() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handlePressAddSchedule = () => {};

  useFocusEffect(
    useCallback(() => {
      loadSchedules().then((schedules) => {
        setSchedules(schedules);
      });
    }, []),
  );

  return (
    <Box>
      <Link href="/config">
        <Button>
          <ButtonText>設定</ButtonText>
        </Button>
      </Link>
      <ScheduleList schedules={schedules} />

      <Button onPress={handlePressAddSchedule}>
        <ButtonText>スケジュールの追加</ButtonText>
      </Button>
    </Box>
  );
}
