import { useAtomValue } from 'jotai';
import { Link } from 'expo-router';
import { Box, Text, FlatList, Button, HStack, ButtonText } from '@gluestack-ui/themed';
import PlanItem from './PlanItem';
import { plansAtom } from '../services/plan-service';
import { darkGrey, unclearWhite, white } from '../constants/Colors';
import type { ListRenderItem } from 'react-native';
import type { Plan } from '../models';

export default function PlanList() {
  const plans = useAtomValue(plansAtom);
  const renderItem: ListRenderItem<Plan> = ({ item }) => <PlanItem item={item} />;

  return (
    <Box h="$full" w="$full" justifyContent="space-between">
      {/* type bug: https://github.com/gluestack/gluestack-ui/issues/1041 */}
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <FlatList data={plans} renderItem={renderItem as any} keyExtractor={(item) => (item as Plan).id} p="$4" />

      <HStack justifyContent="space-between" alignItems="center" p="$4" borderTopWidth={0.3} borderColor={unclearWhite} bg={darkGrey}>
        <Text color={white}>積立プランを追加しよう</Text>
        <Link href="/plans/add" asChild>
          <Button w="$24" size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} rounded="$full">
            <ButtonText>追加</ButtonText>
          </Button>
        </Link>
      </HStack>
    </Box>
  );
}
