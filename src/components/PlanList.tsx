import { ListRenderItem } from 'react-native';
import { Box, Text, FlatList, ScrollView, VStack, Button, HStack, Icon, CheckCircleIcon, CloseCircleIcon, ButtonText } from '@gluestack-ui/themed';
import { Plan } from '../models';
import PlanItem from './PlanItem';
import { darkGrey, green, lightGrey, red, unclearWhite, white } from '../constants/Colors';
import { Link } from 'expo-router';
export type PlanListProps = {
  plans: Plan[];
};
export default function PlanList(props: PlanListProps) {
  const renderItem: ListRenderItem<Plan> = ({ item }) => <PlanItem item={item} />;

  return (
    <Box>
      {/* type bug: https://github.com/gluestack/gluestack-ui/issues/1041 */}
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <FlatList data={props.plans} renderItem={renderItem as any} keyExtractor={(item) => (item as Plan).id} />
      <Box h="auto" w="$full" justifyContent="space-between">
        <ScrollView h="auto">
          <VStack space="sm" p="$4">
            <Link href="/schedule-edit" asChild>
              <Button h="auto" w="100%" bg={lightGrey} rounded="$lg">
                <HStack w="$80" justifyContent="space-between" alignItems="center" px="$2" py="$5">
                  <Box>
                    <HStack space="xs" alignItems="center">
                      <Icon as={CheckCircleIcon} size="sm" color={green} />
                      <Text color={white} fontSize={19} bold pb="$1">
                        Kraken
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={unclearWhite} fontSize={13}>
                        毎日
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        -
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        18:00
                      </Text>
                    </HStack>
                  </Box>
                  <VStack space="xs" alignItems="flex-end">
                    <HStack>
                      <Text color={white} fontSize={19}>
                        1,000
                      </Text>
                      <Text color={white} fontSize={13} pl="$1">
                        円
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={white} fontSize={11}>
                        現在レートで＠
                      </Text>
                      <Text color={white} fontSize={11}>
                        0.02300000
                      </Text>
                      <Text color={white} fontSize={11}>
                        相当
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Button>
            </Link>
            <Link href="/schedule-edit" asChild>
              <Button h="auto" w="100%" bg={lightGrey} rounded="$lg">
                <HStack w="$80" justifyContent="space-between" alignItems="center" px="$2" py="$5">
                  <Box>
                    <HStack space="xs" alignItems="center">
                      <Icon as={CheckCircleIcon} size="sm" color={green} />
                      <Text color={white} fontSize={19} bold pb="$1">
                        bitFlyer
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={unclearWhite} fontSize={13}>
                        毎日
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        -
                      </Text>
                      <Text color={unclearWhite} fontSize={13}>
                        18:00
                      </Text>
                    </HStack>
                  </Box>
                  <VStack space="xs" alignItems="flex-end">
                    <HStack>
                      <Text color={white} fontSize={19}>
                        20,000
                      </Text>
                      <Text color={white} fontSize={13} pl="$1">
                        円
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={white} fontSize={11}>
                        現在レートで＠
                      </Text>
                      <Text color={white} fontSize={11}>
                        0.56700000
                      </Text>
                      <Text color={white} fontSize={11}>
                        相当
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Button>
            </Link>
            <Link href="/schedule-edit" asChild>
              <Button h="auto" w="100%" bg="#33333366" rounded="$lg">
                <HStack w="$80" justifyContent="space-between" alignItems="center" px="$2" py="$5">
                  <Box>
                    <HStack space="xs" alignItems="center">
                      <Icon as={CloseCircleIcon} size="sm" color={red} />
                      <Text color={white} fontSize={19} bold pb="$1">
                        GMOコイン
                      </Text>
                    </HStack>
                    <Text>停止中</Text>
                  </Box>
                  <VStack space="xs" alignItems="flex-end">
                    <HStack>
                      <Text color={white} fontSize={19}>
                        50,000
                      </Text>
                      <Text color={white} fontSize={13} pl="$1">
                        円
                      </Text>
                    </HStack>
                    <HStack space="xs">
                      <Text color={white} fontSize={11}>
                        現在レートで＠
                      </Text>
                      <Text color={white} fontSize={11}>
                        0.78900000
                      </Text>
                      <Text color={white} fontSize={11}>
                        相当
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Button>
            </Link>
          </VStack>
        </ScrollView>

        <HStack justifyContent="space-between" alignItems="center" p="$4" mb="$3" borderTopWidth={0.3} borderColor={unclearWhite} bg={darkGrey}>
          <Text color={white}>積立プランを追加しよう</Text>
          <Link href="/schedule-registration" asChild>
            <Button w="$24" size="lg" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} rounded="$full">
              <ButtonText>追加</ButtonText>
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}
