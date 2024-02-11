import { Stack } from 'expo-router';
import PlanScreenBase from '../../components/PlanScreenBase';

/**
 * 積立プラン作成画面
 */
export default function PlanAddScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '積立プラン作成',
          presentation: 'card',
        }}
      />
      <PlanScreenBase />
    </>
  );
}
