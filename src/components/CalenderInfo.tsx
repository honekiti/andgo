import { useAtomValue } from 'jotai';
import { Box, Button, ButtonText, HStack, LinkText, ScrollView, Text, VStack, Image } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey, green, red } from '../constants/Colors';
import { Link } from 'expo-router';
import { exchangeCredentialsAtom } from '../services/exchange-service';
import { ordersAtom } from '../services/calendar-service';

export default function CalenderInfo() {
  const credentials = useAtomValue(exchangeCredentialsAtom);
  const orders = useAtomValue(ordersAtom);

  console.log('AAA', orders);

  return (
    <>
      <HStack h="0.5%">
        <Box h="100%" w="50%" bg={white} rounded="$full" />
        <Box h="100%" w="50%" bg={unclearWhite} rounded="$full" />
      </HStack>
      <ScrollView h="$full" w="$full">
        {/* ↓ 取引所連携前 ↓ */}
        {credentials.length === 0 && (
          <Box justifyContent="space-between">
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
              <Link href="https://andgo.notion.site/">
                <LinkText color={white} underline>
                  連携する方法を見る
                </LinkText>
              </Link>
            </Box>
          </Box>
        )}
        {/* ↑ 取引所連携前 ↑ */}
        {/* ↓ 取引所連携後 ↓ */}
        {credentials.length > 0 && (
          <VStack>
            <HStack justifyContent="space-between" alignItems="center" py="$5" px="$4" borderBottomWidth={0.5} borderColor={lightGrey}>
              <Box alignItems="center">
                <Text fontSize={10}>2022.3</Text>
                <Box h="$12" w="$12" rounded="$lg" alignItems="center" bg={lightGrey}>
                  <Text color={white} fontSize={11}>
                    木
                  </Text>
                  <Text color={white} fontSize={16} bold>
                    10
                  </Text>
                </Box>
              </Box>

              <VStack space="xs" alignItems="flex-end">
                <HStack space="xs">
                  <Text fontSize={13}>Kraken</Text>
                  <Text fontSize={13}>-</Text>
                  <Text fontSize={13} pr="$1">
                    18:00
                  </Text>
                  <Text fontSize={18} bold>
                    1,000
                  </Text>
                  <Text fontSize={13}>円</Text>
                  <Box h="auto" w="auto" bg={green} rounded="$md" px="$1.5" ml="$1">
                    <Text fontSize={12} color={white}>
                      実行済
                    </Text>
                  </Box>
                </HStack>
                <HStack space="xs">
                  <Text fontSize={13}>bitFlyer</Text>
                  <Text fontSize={13}>-</Text>
                  <Text fontSize={13} pr="$1">
                    14:00
                  </Text>
                  <Text fontSize={18} bold>
                    20,000
                  </Text>
                  <Text fontSize={13}>円</Text>
                  <Box h="auto" w="auto" bg={green} rounded="$md" px="$1.5" ml="$1">
                    <Text fontSize={12} color={white}>
                      実行済
                    </Text>
                  </Box>
                </HStack>
                <HStack space="xs">
                  <Text fontSize={13}>GMOコイン</Text>
                  <Text fontSize={13}>-</Text>
                  <Text fontSize={13} pr="$1">
                    12:00
                  </Text>
                  <Text fontSize={18} bold>
                    5,000
                  </Text>
                  <Text fontSize={13}>円</Text>
                  <Box h="auto" w="auto" bg={red} rounded="$md" px="$1.5" ml="$1">
                    <Text fontSize={12} color={white}>
                      連携エラー
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </HStack>

            <Box alignItems="center" justifyContent="center">
              <Box h="$0.5" w="100%" bg={unclearWhite} position="absolute" />
              <Box h="auto" w="auto" borderWidth={1} borderColor={unclearWhite} rounded="$full" px="$3" bg={darkGrey}>
                <HStack space="xs">
                  <Text fontSize={13}>現在</Text>
                  <Text fontSize={13}>13:00</Text>
                </HStack>
              </Box>
            </Box>

            <HStack justifyContent="space-between" alignItems="center" py="$5" px="$4" borderBottomWidth={0.3} borderColor={lightGrey}>
              <Box alignItems="center">
                <Text fontSize={10}>2022.3</Text>
                <Box h="$12" w="$12" rounded="$lg" alignItems="center" bg={lightGrey}>
                  <Text color={white} fontSize={11}>
                    金
                  </Text>
                  <Text color={white} fontSize={16} bold>
                    11
                  </Text>
                </Box>
              </Box>

              <VStack space="xs" alignItems="flex-end">
                <HStack space="xs">
                  <Text color={white} fontSize={13}>
                    Kraken
                  </Text>
                  <Text color={white} fontSize={13}>
                    -
                  </Text>
                  <Text color={white} fontSize={13} pr="$1">
                    18:00
                  </Text>
                  <Text color={white} fontSize={18} bold>
                    1,000
                  </Text>
                  <Text color={white} fontSize={13}>
                    円
                  </Text>
                </HStack>
                <HStack space="xs">
                  <Text color={white} fontSize={13}>
                    bitFlyer
                  </Text>
                  <Text color={white} fontSize={13}>
                    -
                  </Text>
                  <Text color={white} fontSize={13} pr="$1">
                    14:00
                  </Text>
                  <Text color={white} fontSize={18} bold>
                    20,000
                  </Text>
                  <Text color={white} fontSize={13}>
                    円
                  </Text>
                </HStack>
                <HStack space="xs">
                  <Text color={white} fontSize={13}>
                    GMOコイン
                  </Text>
                  <Text color={white} fontSize={13}>
                    -
                  </Text>
                  <Text color={white} fontSize={13} pr="$1">
                    12:00
                  </Text>
                  <Text color={white} fontSize={18} bold>
                    5,000
                  </Text>
                  <Text color={white} fontSize={13}>
                    円
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" py="$5" px="$4" borderBottomWidth={0.3} borderColor={lightGrey}>
              <Box alignItems="center">
                <Text fontSize={10}>2022.3</Text>
                <Box h="$12" w="$12" rounded="$lg" alignItems="center" bg={lightGrey}>
                  <Text color={white} fontSize={11}>
                    土
                  </Text>
                  <Text color={white} fontSize={16} bold>
                    12
                  </Text>
                </Box>
              </Box>

              <VStack space="xs" alignItems="flex-end">
                <HStack space="xs">
                  <Text color={red} fontSize={13}>
                    Kraken
                  </Text>
                  <Text color={red} fontSize={13}>
                    -
                  </Text>
                  <Text color={red} fontSize={13} pr="$1">
                    18:00
                  </Text>
                  <Text color={red} fontSize={18} bold>
                    1,000
                  </Text>
                  <Text color={red} fontSize={13}>
                    円
                  </Text>
                  <Box h="auto" w="auto" bg={red} rounded="$md" px="$1.5" ml="$1">
                    <Text fontSize={12} color={white}>
                      残高不足
                    </Text>
                  </Box>
                </HStack>
                <HStack space="xs">
                  <Text color={white} fontSize={13}>
                    bitFlyer
                  </Text>
                  <Text color={white} fontSize={13}>
                    -
                  </Text>
                  <Text color={white} fontSize={13} pr="$1">
                    14:00
                  </Text>
                  <Text color={white} fontSize={18} bold>
                    20,000
                  </Text>
                  <Text color={white} fontSize={13}>
                    円
                  </Text>
                </HStack>
                <HStack space="xs">
                  <Text color={white} fontSize={13}>
                    GMOコイン
                  </Text>
                  <Text color={white} fontSize={13}>
                    -
                  </Text>
                  <Text color={white} fontSize={13} pr="$1">
                    12:00
                  </Text>
                  <Text color={white} fontSize={18} bold>
                    5,000
                  </Text>
                  <Text color={white} fontSize={13}>
                    円
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Box h="$80" />
          </VStack>
        )}
        {/* ↑ 取引所連携後 ↑ */}
      </ScrollView>
    </>
  );
}
