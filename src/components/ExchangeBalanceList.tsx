import { useAtomValue } from 'jotai';
import { Box, Button, ButtonText, FlatList, HStack, ScrollView, Text } from '@gluestack-ui/themed';
import { white, unclearWhite } from '../constants/Colors';
import { Link } from 'expo-router';
import PlanList from './PlanList';
import { exchangeCredentialsAtom, getExchangeFromCredential } from '../services/exchange-service';
import ExchangeBalanceItem from './ExchangeBalanceItem';
import { ExchangeCredential } from '../models';

export default function ExchangeBalanceList() {
  const credentials = useAtomValue(exchangeCredentialsAtom);

  return (
    <>
      <Box h="50%">
        <Text w="75%" fontSize={17} color={white} fontWeight="500">
          取引所残高
        </Text>
      </Box>

      {/* ↓ 取引所連携前 ↓ */}
      {credentials.length === 0 && (
        <Text fontSize={13} color={white}>
          現在、表示する情報はありません
        </Text>
      )}
      {/* ↑ 取引所連携前 ↑ */}

      {/* ↓ 取引所連携後 ↓ */}
      {credentials.length > 0 && (
        <FlatList
          data={credentials}
          renderItem={({ item }) => <ExchangeBalanceItem exchange={getExchangeFromCredential(item as ExchangeCredential)} />}
          keyExtractor={(item) => (item as ExchangeCredential).exchangeId}
        />
      )}
      {/* ↑ 取引所連携後 ↑ */}
    </>
  );
}
