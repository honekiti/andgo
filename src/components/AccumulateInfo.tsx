import { useAtomValue } from 'jotai';
import { Box, Button, ButtonText, HStack, ScrollView, Text, Image } from '@gluestack-ui/themed';
import { white, unclearWhite } from '../constants/Colors';
import { Link } from 'expo-router';
import PlanList from './PlanList';
import { exchangeCredentialsAtom } from '../services/exchange-service';

/**
 * プラン一覧コンポーネント
 * @returns
 */
export default function AccumulateInfo() {
  const credentials = useAtomValue(exchangeCredentialsAtom);

  return (
    <>
      <HStack h="0.5%">
        <Box h="100%" w="50%" bg={unclearWhite} rounded="$full" />
        <Box h="100%" w="50%" bg={white} rounded="$full" />
      </HStack>

      {/* ↓ 取引所連携前 ↓ */}
      {credentials.length === 0 && (
        <ScrollView>
          <Box h="auto" alignItems="center" my="$7">
            <Image size="xs" my="$3" resizeMode="contain" source={require('../../assets/images/link.png')} alt="bit-coin-line-logo" />
            <Text mt="$2">暗号資産(仮想通貨)取引所と</Text>
            <Text mb="$7">連携しましょう</Text>
            <Link href="/exchange-registration" asChild>
              <Button
                h="$12"
                w="90%"
                mb="$5"
                size="md"
                variant="outline"
                action="secondary"
                isDisabled={false}
                isFocusVisible={false}
                borderWidth={2}
                rounded="$lg"
              >
                <ButtonText color={white}>取引所と連携する</ButtonText>
              </Button>
            </Link>
          </Box>
        </ScrollView>
      )}
      {/* ↑ 取引所連携前 ↑ */}

      {/* ↓ 取引所連携後 ↓ */}
      {credentials.length > 0 && <PlanList />}
      {/* ↑ 取引所連携後 ↑ */}
    </>
  );
}
