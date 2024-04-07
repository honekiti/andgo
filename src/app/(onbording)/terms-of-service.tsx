import { useState } from 'react';
import {
  Box,
  Text,
  Button,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  ScrollView,
  VStack,
  Pressable,
} from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { accountAtom } from '../../services/account-service';
import { TERMS } from '../../components/TERMS';
import { unclearWhite, darkGrey } from '../../constants/Colors';

/**
 * 利用規約同意画面
 */
export default function TermsOfServiceScreen() {
  const [account, setAccount] = useAtom(accountAtom);
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState(false);
  const handleCheckboxChange = () => setIsAgreed(!isAgreed);

  const handleSubmit = () => {
    setAccount(async (v) => ({ ...(await account), agreement: true }));
    router.replace('/home');
  };

  return (
    <Box flex={1} width="$full" bg={darkGrey}>
      <Stack.Screen
        options={{
          title: '利用規約のご確認',
          presentation: 'card',
        }}
      />

      <ScrollView width="$full" contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} aria-label="利用規約">
        <Text mt="$10" color="white" fontSize={22} fontWeight="$medium">
          利用規約
        </Text>

        <Text mt="$10" padding={4} fontStyle="normal" fontSize="$md" width={'90%'} color="white">
          {TERMS.pre}
        </Text>

        {TERMS.sections.map((section) => (
          <VStack padding={4} paddingTop={4} key={section.title} width={'90%'}>
            <VStack width="$full" alignItems="center">
              <Text fontWeight="bold" textAlign="left" fontSize="$md" width={'100%'} color="white">
                {section.title}
              </Text>
            </VStack>
            {section.contents.map((item, itemIndex) => (
              <Text fontSize="$md" key={`${section.title}-${itemIndex}`} color="white">
                {item}
              </Text>
            ))}
          </VStack>
        ))}

        <Text fontSize="$md" color="white" textAlign="center" mt="$4" mb="$20">
          {TERMS.post}
        </Text>
      </ScrollView>

      {!account.agreement && (
        <Pressable onPress={handleCheckboxChange}>
          <Box justifyContent="center" alignItems="center" m="$4" p="$4" bgColor="#333333" borderRadius="$lg">
            <Checkbox
              value="somevalue"
              size="lg"
              mb="$2"
              onChange={handleCheckboxChange}
              aria-label="利用規約に同意する"
              isChecked={isAgreed}
              isInvalid={false}
              isDisabled={false}
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>

            <Text color="white">アプリをお使い頂くにあたり</Text>
            <Text color="white">利用規約に同意して頂く必要があります</Text>
          </Box>
        </Pressable>
      )}

      {!account.agreement && (
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderTopWidth={0.5}
          borderColor={unclearWhite}
          px="$4"
          pt="$3"
          pb="$7"
        >
          <Button
            bgColor={isAgreed ? '#f97316' : 'rgba(249, 115, 22, 0.5)'}
            w="$full"
            justifyContent="center"
            alignItems="center"
            disabled={!isAgreed}
            opacity={isAgreed ? 1 : 0.5}
            onPress={handleSubmit}
          >
            <ButtonText>同意する</ButtonText>
          </Button>
        </Box>
      )}
    </Box>
  );
}
