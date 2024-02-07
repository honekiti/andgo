import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Button, ButtonText, ScrollView, Text } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey, red, green } from '../constants/Colors';
import { Link } from 'expo-router';
import { genId } from '../utils/crypto';
import { loadSchedules, saveScheduels } from '../services/schedule-service';
import { ExchangeCredential, Schedule } from '../models';
import ScheduleList from './ScheduleList';
import { loadCredentials } from '../services/exchange-credential-service';

export default function AccumulateInfo() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // このコンポーネントを含む画面にフォーカスが当たった際にスケジュール情報を読み込む
  // ↓の「スケジュール情報」のlengthを使用すると、連携した直後の場面で「連携しよう」画面が表示されてしまうので「credentials」に取引所が入った段階で画面切り替えてます。
  // useFocusEffect(
  //   useCallback(() => {
  //     loadSchedules().then((schedules) => {
  //       setSchedules(schedules);
  //     });
  //   }, []),
  // );

  // 取引所連携情報読み込みを有効にしたら、初期値を空配列にする
  const [credentials, setCredentials] = useState<ExchangeCredential[]>([]);
  // 取引所連携情報を読み込む
  useFocusEffect(
    useCallback(() => {
      loadCredentials().then((credentials) => {
        setCredentials(credentials);
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
      {credentials.length === 0 && (
        <ScrollView>
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
            <Box h="$40" />
          </Box>
        </ScrollView>
      )}
      {/* ↑ 取引所連携前 ↑ */}

      {/* ↓ 取引所連携後 ↓ */}
      {credentials.length > 0 && <ScheduleList schedules={schedules} />}
      {/* ↑ 取引所連携後 ↑ */}
    </>
  );
}
