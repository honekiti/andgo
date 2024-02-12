import { Box, Text } from '@gluestack-ui/themed';
import { Plan } from '../models';

export type PlanItemProps = {
  item: Plan;
};

export default function PlanItem(props: PlanItemProps) {
  return (
    <Box justifyContent="center">
      <Text>{JSON.stringify(props.item)}</Text>
    </Box>
  );
}
