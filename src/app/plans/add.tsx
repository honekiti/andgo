import { Stack } from 'expo-router';
import { SafeAreaView } from '@gluestack-ui/themed';
import PlanScreenBase from '../../components/PlanScreenBase';

/**
 * 積立プラン作成画面
 */
export default function PlanAddScreen() {
  return (
    <SafeAreaView flex={1} bgColor="$black">
      <Stack.Screen
        options={{
          title: '積立プラン作成',
          presentation: 'card',
        }}
      />
      <PlanScreenBase />
    </SafeAreaView>
  );
}
