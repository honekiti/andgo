import { ListRenderItem } from 'react-native';
import { Box, Heading, FlatList } from '@gluestack-ui/themed';
import { Schedule } from '../models';
import ScheduleItem from './ScheduleItem';
export type ScheduleListProps = {
  schedules: Schedule[];
};
export default function ScheduleList(props: ScheduleListProps) {
  const renderItem: ListRenderItem<Schedule> = ({ item }) => <ScheduleItem item={item} />;

  return (
    <Box py="$10">
      <Heading size="xl" p="$4" pb="$3">
        スケジュール
      </Heading>
      {/* type bug: https://github.com/gluestack/gluestack-ui/issues/1041 */}
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <FlatList data={props.schedules} renderItem={renderItem as any} keyExtractor={(item) => (item as Schedule).id} />
    </Box>
  );
}
