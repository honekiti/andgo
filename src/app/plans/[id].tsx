import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from '@gluestack-ui/themed';
import PlanScreenBase from '../../components/PlanScreenBase';
import type { PlanId } from '../../models';

/**
 * 積立プラン編集画面
 */
export default function PlanUpdateScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView flex={1} bgColor="$black">
      <Stack.Screen
        options={{
          title: '積立プラン編集',
          presentation: 'card',
        }}
      />
      <PlanScreenBase targetPlanId={id as PlanId} />
    </SafeAreaView>
  );
}
