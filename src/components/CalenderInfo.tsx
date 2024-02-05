import { Box, Button, ButtonText, HStack, LinkText, Text, VStack } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey, green, red } from '../constants/Colors';
import { Link } from 'expo-router';

export default function CalenderInfo() {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box h="$0.5" w="50%" bg={white} rounded="$full" />
        <Box h="$0.5" w="50%" bg={unclearWhite} rounded="$full" />
      </Box>
      {/* ↓ 取引所連携前 ↓ */}
      {/* <Box h="auto" alignItems="center" my="$7">
        <Box h="$20" w="$20" bg="#00f3" rounded={'$full'} />
        <Text mt="$2">暗号資産(仮想通貨)取引所と</Text>
        <Text>連携しましょう</Text>
      </Box>

      <Box h="auto" alignItems="center" mb="$7">
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
      </Box> */}
      {/* ↑ 取引所連携前 ↑ */}
      {/* ↓ 取引所連携後 ↓ */}
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
      </VStack>
      {/* ↑ 取引所連携後 ↑ */}
    </>
  );
}