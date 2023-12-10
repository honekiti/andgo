import { Box } from '@gluestack-ui/themed';
import { Schedule } from '../models';

export type ScheduleItemProps = {
  item: Schedule;
};

export default function ScheduleItem(props: ScheduleItemProps) {
  return <Box justifyContent="center">{JSON.stringify(props.item)}</Box>;
}
