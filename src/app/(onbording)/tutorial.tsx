import { Box, Text, Button, ButtonText, HStack, Image, ScrollView } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { darkGrey, unclearWhite } from '../../constants/Colors';
import { Dimensions } from 'react-native';
/**
 * チュートリアル画面
 */

const { width } = Dimensions.get('window');

export default function TutorialScreen() {
  return (
    <Box flex={1} bg={darkGrey}>
      <ScrollView h={'100%'} w={'100%'} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} bg={darkGrey}>
        <HStack alignItems="center" flexDirection="row">
          <Image h={'100%'} w={width} source={require('../../assets/images/tutorial1.png')} />
          <Image h={'100%'} w={width} source={require('../../assets/images/tutorial2.png')} />
          <Image h={'100%'} w={width} source={require('../../assets/images/tutorial3.png')} />
          <Image h={'100%'} w={width} source={require('../../assets/images/tutorial4.png')} />
          <Image h={'100%'} w={width} source={require('../../assets/images/tutorial5.png')} />
          <Image h={'100%'} w={width} source={require('../../assets/images/tutorial6.png')} />
          <Image h={'100%'} w={width} source={require('../../assets/images/tutorial7.png')} />
        </HStack>
      </ScrollView>
      <Box flexDirection="column" alignItems="center" justifyContent="center" borderTopWidth={0.5} borderColor={unclearWhite} px="$4" pt="$3" pb="$7">
        <Link href="/terms-of-service" asChild>
          <Button bgColor="#f97316" w={'$full'} justifyContent="center" alignItems="center">
            <ButtonText>はじめる</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
