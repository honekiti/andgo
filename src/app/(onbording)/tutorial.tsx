import { Box, Button, ButtonText, HStack, Image, ScrollView } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { darkGrey, unclearWhite } from '../../constants/Colors';
import { Dimensions } from 'react-native';
import { useState, useRef } from 'react';
/**
 * チュートリアル画面
 */

const { width } = Dimensions.get('window');
const imageCount = 7; // 画像の数

export default function TutorialScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleScroll = (event: { nativeEvent: { contentOffset: { x: any } } }) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / width);
    setCurrentIndex(newIndex);
  };

  const isLastImage = currentIndex === imageCount - 1;

  return (
    <Box flex={1} bg={darkGrey}>
      <ScrollView
        h={'100%'}
        w={'100%'}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bg={darkGrey}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
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
          <Button
            bgColor={isLastImage ? '#f97316' : 'rgba(249, 115, 22, 0.5)'}
            w={'$full'}
            justifyContent="center"
            alignItems="center"
            opacity={isLastImage ? 1 : 0.5}
            disabled={!isLastImage}
          >
            <ButtonText>はじめる</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
