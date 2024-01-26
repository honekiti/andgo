import { Box, Text } from '@gluestack-ui/themed';
import { Schedule } from '../models';

export type ScheduleItemProps = {
  item: Schedule;
};

export default function ScheduleItem(props: ScheduleItemProps) {
  return (
    <Box justifyContent="center">
      <Text>{JSON.stringify(props.item)}</Text>
    </Box>
  );
}
