import { ListRenderItem } from 'react-native';
import { Box, FlatList } from '@gluestack-ui/themed';
import ExchangeInfoItem, { ExchangeInfo } from './ExchangeInfoItem';

export type ExchangeInfoListProps = {
  exchangeInfos: ExchangeInfo[];
};

export default function ExchangeInfoList(props: ExchangeInfoListProps) {
  const renderItem: ListRenderItem<ExchangeInfo> = ({ item }) => <ExchangeInfoItem item={item} />;

  return (
    <Box py="$10">
      {/* type bug: https://github.com/gluestack/gluestack-ui/issues/1041 */}
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <FlatList data={props.exchangeInfos} renderItem={renderItem as any} keyExtractor={(item) => (item as ExchangeInfo).name} />
    </Box>
  );
}
