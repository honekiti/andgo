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
  ChevronLeftIcon,
  Icon,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { TERMS } from '../../components/TERMS';
import { white, unclearWhite, darkGrey, lightGrey } from '../../constants/Colors';

/**
 * 利用規約同意画面
 */
export default function TermsOfServiceScreen() {
  return (
    <Box flex={1} bg={darkGrey}>
      <ScrollView flex={1} flexDirection="column" width={'100%'} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Box height={10} />
        <Box justifyContent="center" alignItems="center" height={150} width={'90%'} marginTop={'15%'} bgColor="#333333" borderRadius={'$lg'}>
          <Checkbox value="somevalue" size="lg" isInvalid={false} isDisabled={false}>
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>

          <Text color="white">アプリをお使い頂くにあたり</Text>
          <Text color="white">利用規約に同意して頂く必要があります</Text>
        </Box>
        <Box height={40} />
        <Text color="white" fontSize={22} fontWeight="$medium">
          利用規約
        </Text>
        <Box height={40} />
        <Text padding={4} fontStyle="normal" fontSize="$md" width={'90%'} color="white">
          {TERMS.pre}
        </Text>
        {TERMS.sections.map((section, sectionIndex) => (
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
            <Text fontSize="$md" color="white" textAlign="center">
              {TERMS.post}
            </Text>
          </VStack>
        ))}
      </ScrollView>
      <Box flexDirection="column" alignItems="center" justifyContent="center" borderTopWidth={0.5} borderColor={unclearWhite} px="$4" pt="$3" pb="$7">
        <Link href="/home" asChild>
          <Button bgColor="#f97316" w={'$full'} justifyContent="center" alignItems="center">
            <ButtonText>同意する</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
