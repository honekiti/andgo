import { Box, Button, ButtonText, Link, LinkText, Text } from '@gluestack-ui/themed';
import { white, unclearWhite, darkGrey, lightGrey } from '../constants/Colors';

export default function CalenderInfo() {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box h="$0.5" w="50%" bg={white} rounded="$full" />
        <Box h="$0.5" w="50%" bg={unclearWhite} rounded="$full" />
      </Box>

      <Box h="auto" alignItems="center" my="$7">
        <Box h="$20" w="$20" bg="#00f3" rounded={'$full'} />
        <Text mt="$2">暗号資産(仮想通貨)取引所と</Text>
        <Text>連携しましょう</Text>
      </Box>

      <Box h="auto" alignItems="center" mb="$7">
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
        <Link href="https://andgo.notion.site/">
          <LinkText color={white} underline>
            連携する方法を見る
          </LinkText>
        </Link>
      </Box>
    </>
  );
}
