import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Button, ButtonText, LinkText, Text } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey } from '../constants/Colors';
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

      <Box h="auto" alignItems="center" my="$7">
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
      </Box>
    </>
  );
}
