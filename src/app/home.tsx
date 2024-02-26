import { useState } from 'react';
import { Stack, Link } from 'expo-router';
import { Box, Button, ButtonIcon, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsIcon, ArrowRightIcon, AddIcon, RemoveIcon, CalendarDaysIcon, PaperclipIcon, Image } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey, orange } from '../constants/Colors';
import CalenderInfo from '../components/CalenderInfo';
import AccumulateInfo from '../components/AccumulateInfo';
import ExchangeBalanceList from '../components/ExchangeBalanceList';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box h="100%" pt={insets.top} pb={insets.bottom} pl={insets.left} pr={insets.right} bg="#000">
      <Stack.Screen
        options={{
          title: 'ホーム',
          headerShown: false,
        }}
      />

      <Box h="35%" p="$3" display="flex" flexDirection="column">
        <Box h="50%" display="flex" flexDirection="column">
          <HStack h="40%" justifyContent="space-between">
            <Box w="auto" justifyContent="center">
              <Text color={white} bold>
                積立BTC
              </Text>
            </Box>
            <Link href="/config" asChild>
              <Button w="auto" borderRadius="$full" pr="$2" bg="#0000">
                <ButtonIcon h="$8" w="$8" as={SettingsIcon} />
              </Button>
            </Link>
          </HStack>

          <Box h="60%">
            <Box h="50%" alignItems="center" display="flex" flexDirection="row">
              <Text color={white} fontSize={23}>
                31,000,000
              </Text>
              <Text color={white} fontSize={14} pl="$1">
                円
              </Text>
            </Box>
            <Box h="50%" display="flex" flexDirection="row">
              <Image
                size="2xs"
                bgColor="#0000"
                resizeMode="contain"
                source={require('../../assets/images/bit-coin-line.png')}
                alt="bit-coin-line-logo"
              />
              <Text color={white} fontSize={13}>
                0.12300000
              </Text>
            </Box>
          </Box>
        </Box>

        <HStack h="50%" justifyContent="space-between" alignItems="flex-start" pb="$2">
          {/* ↓ positive ↓ */}
          {/* <VStack h="auto" w="49%" p="$3" bg={orange} rounded="$lg">
            <HStack h="50%" justifyContent="space-between">
              <Text w="75%" fontSize={17} color={white} fontWeight="500">
                運用損益
              </Text>
              <Text color={white} fontSize={18} fontWeight="800">
                ↗
              </Text>
            </HStack>
            <HStack reversed={true}>
              <HStack space="xs">
                <Text color={white} fontSize={13}>
                  +
                </Text>
                <Text color={white} fontSize={23}>
                  3.3
                </Text>
                <Text color={white} fontSize={13}>
                  %
                </Text>
              </HStack>
            </HStack>
            <HStack reversed={true}>
              <Text color={white} fontSize={11}>
                円相当
              </Text>
              <Text color={white} fontSize={13}>
                100,000
              </Text>
            </HStack>
          </VStack> */}
          {/* ↑ positive ↑ */}

          {/* ↓ negative ↓ */}
          {/* <VStack h="auto" w="49%" p="$3" bg={emeraldGreen} rounded="$lg">
            <HStack h="50%" justifyContent="space-between">
              <Text w="75%" fontSize={17} color={white} fontWeight="500">
                運用損益
              </Text>
              <Text color={white} fontSize={18} fontWeight="800">
                ↘
              </Text>
            </HStack>
            <HStack reversed={true}>
              <HStack space="xs">
                <Text color={white} fontSize={13}>
                  -
                </Text>
                <Text color={white} fontSize={23}>
                  0.2
                </Text>
                <Text color={white} fontSize={13}>
                  %
                </Text>
              </HStack>
            </HStack>
            <HStack reversed={true}>
              <Text color={white} fontSize={11}>
                円相当
              </Text>
              <Text color={white} fontSize={13}>
                50,000
              </Text>
            </HStack>
          </VStack> */}
          {/* ↑ negative ↑ */}

          <VStack h="auto" w="49%" p="$3" bg={darkGrey} rounded="$lg">
            <HStack h="50%" justifyContent="space-between">
              <Text w="75%" fontSize={17} color={white} fontWeight="500">
                運用損益
              </Text>
              <AddIcon as={ArrowRightIcon} size="lg" color={white} />
            </HStack>
            <Text fontSize={13} color={white}>
              現在、表示する情報はありません
            </Text>
          </VStack>

          {/* 取引所残高一覧表示カード */}
          <VStack h="auto" w="49%" p="$3" bg={darkGrey} rounded="$lg">
            <ExchangeBalanceList />
          </VStack>
        </HStack>
      </Box>

      <Box h="65%" w="100%" bg={darkGrey} rounded="$3xl">
        <Box h="3%" justifyContent="flex-end" alignItems="center">
          <Box h="$1" w="$16" bg={lightGrey} rounded="$full" />
        </Box>
        <HStack h="11%" w="100%" alignItems="center">
          <Pressable h="100%" w="50%" justifyContent="center" pt="$2" onPress={() => setActiveTab(0)}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <AddIcon as={CalendarDaysIcon} size="md" color={white} mr="$1" />
              <Text color={white} fontWeight="500">
                カレンダー
              </Text>
            </Box>
          </Pressable>
          <Pressable h="100%" w="50%" justifyContent="center" pt="$2" onPress={() => setActiveTab(1)}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <AddIcon as={PaperclipIcon} size="md" color={white} mr="$1" />
              <Text color={white} fontWeight="500">
                積立プラン
              </Text>
            </Box>
          </Pressable>
        </HStack>
        <Box h="85.5%">
          {activeTab === 0 && <CalenderInfo />}
          {activeTab === 1 && <AccumulateInfo />}
        </Box>
      </Box>
    </Box>
  );
}
