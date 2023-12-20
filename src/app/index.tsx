import { useState, useCallback } from 'react';
import { useFocusEffect, Link } from 'expo-router';
import { Box, Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsIcon } from '@gluestack-ui/themed';
import ScheduleList from '../components/ScheduleList';
import { loadSchedules } from '../services/schedule-service';
import { Schedule } from '../models';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
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
    </Box>
  );
}
