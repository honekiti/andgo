import { useState, useRef } from 'react';
// gloustack uiのScrollViewにはrefが定義されていないため、react-nativeのScrollViewを使用する
import { Dimensions, ScrollView } from 'react-native';
import { SafeAreaView, Box, Button, ButtonText, HStack, VStack, Image, Text } from '@gluestack-ui/themed';
import { Stack, Link } from 'expo-router';
import { darkGrey, unclearWhite } from '../../constants/Colors';
import CarouselIndicator from '../../components/CarouselIndicator';

type SlideType = {
  id: string;

  title: string;
  subTitle: { id: string; text: string; textStyle: string }[];
  imageSrc: string;
  messages: { id: string; text: string }[];
  lastslide?: string;
};

const SLIDES: SlideType[] = [
  {
    id: '1',
    title: '自動でかんたん',
    subTitle: [
      { id: '1', text: 'ビットコイン', textStyle: 'big20.black' },
      { id: '2', text: 'で', textStyle: 'body15.black' },
      { id: '3', text: '資産形成', textStyle: 'big20.black' },
    ],
    imageSrc: require('../../../assets/images/tutorial1.png'),
    messages: [
      {
        id: '1',
        text: '暗号資産(仮想通貨)取引所と連携して、設定したスケジュール、金額でビットコインを継続的に購入することができるアプリです。ドルコスト平均法でビットコインを積み立てて資産形成したい方におすすめです。',
      },
    ],
  },
  {
    id: '2',
    title: 'アプリの使い方：その1',
    subTitle: [
      { id: '1', text: '取引所', textStyle: 'big20.black' },
      { id: '2', text: 'を', textStyle: 'body15.black' },
      { id: '3', text: '開設', textStyle: 'big20.black' },
    ],
    imageSrc: require('../../../assets/images/tutorial2.png'),
    messages: [
      { id: '1', text: '暗号資産(仮想通貨)取引所にアカウントを開設、取引所アカウントにビットコイン購入の原資を入金します。' },
      { id: '2', text: '＊このアプリでは、暗号資産(仮想通貨)取引所の開設は行なえません。' },
    ],
  },
  {
    id: '3',
    title: 'アプリの使い方：その2',
    subTitle: [
      { id: '1', text: '取引所', textStyle: 'big20.black' },
      { id: '2', text: 'と', textStyle: 'body15.black' },
      { id: '3', text: '連携', textStyle: 'big20.black' },
    ],
    imageSrc: require('../../../assets/images/tutorial3.png'),
    messages: [{ id: '1', text: '「つみたてとこ」ではAPIキー・APIシークレットを登録し、暗号資産(仮想通貨)取引所と連携します。' }],
  },
  {
    id: '4',
    title: 'アプリの使い方：その3',
    subTitle: [
      { id: '1', text: '積立スケジュール', textStyle: 'big20.black' },
      { id: '2', text: 'を', textStyle: 'body15.black' },
      { id: '3', text: '設定', textStyle: 'big20.black' },
    ],
    imageSrc: require('../../../assets/images/tutorial4.png'),
    messages: [{ id: '1', text: 'どの取引所で何時、いくら相当のビットコインを購入するか決め、積立スケジュールを設定します。' }],
  },
  {
    id: '5',
    title: 'アプリの使い方：その4',
    subTitle: [
      { id: '1', text: 'ビットコイン', textStyle: 'big20.black' },
      { id: '2', text: 'の', textStyle: 'body15.black' },
      { id: '3', text: '自動積立', textStyle: 'big20.black' },
    ],
    imageSrc: require('../../../assets/images/tutorial5.png'),
    messages: [
      {
        id: '1',
        text: '積立スケジュールが実行されると、ユーザーの取引所アカウントでビットコインが購入され、購入されたデータが「つみたてとこ」に反映されます。',
      },
    ],
  },
  {
    id: '6',
    title: 'アプリの使い方：その5',
    subTitle: [
      { id: '1', text: 'いつでも積立状況', textStyle: 'big20.black' },
      { id: '2', text: 'を', textStyle: 'body15.black' },
      { id: '3', text: '確認', textStyle: 'big20.black' },
    ],
    imageSrc: require('../../../assets/images/tutorial6.png'),
    messages: [{ id: '1', text: 'いつでも「つみたてとこ」から積立状況や残高の確認・管理が行えます。' }],
  },
  {
    id: '7',
    title: '',
    subTitle: [
      { id: '1', text: 'さぁ、ビットコイン', textStyle: 'caption12.black' },
      { id: '2', text: 'の', textStyle: 'tiny10.black' },
      { id: '3', text: '自動積立貯金を', textStyle: 'caption12.black' },
    ],
    lastslide: 'はじめよう！',
    imageSrc: require('../../../assets/images/tutorial7.png'),
    messages: [],
  },
];

const { width } = Dimensions.get('window');

/**
 * チュートリアル画面
 */
export default function TutorialScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastImage = currentIndex === SLIDES.length - 1;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleScroll = (event: { nativeEvent: { contentOffset: { x: any } } }) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / width);
    setCurrentIndex(newIndex);
  };

  const handleOnChangePage = (newPageIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: newPageIndex * width });
    }
  };

  return (
    <SafeAreaView flex={1} bg={darkGrey}>
      <Stack.Screen
        options={{
          title: 'チュートリアル',
          headerShown: false,
        }}
      />

      <ScrollView
        ref={scrollViewRef}
        style={{ width: '100%', height: '100%', backgroundColor: darkGrey }}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <HStack alignItems="center" flexDirection="row">
          {SLIDES.map((slide) => (
            <VStack w={width} key={slide.id}>
              {/* 画像より上の部分 */}
              <Text color="white" fontWeight="$bold" fontSize={'$lg'} textAlign="center">
                {slide.title}
              </Text>
              <HStack h={'5%'} alignItems="center" justifyContent="center">
                {slide.subTitle.map((sub) => (
                  <Text key={sub.id} color="white" fontWeight="$bold" fontSize={21}>
                    {sub.text}
                  </Text>
                ))}
              </HStack>
              {slide.lastslide ? (
                <VStack>
                  <Text color="white" fontWeight="$bold" textAlign="center" fontSize={22}>
                    {slide.lastslide}
                  </Text>
                </VStack>
              ) : (
                <></>
              )}

              {/* 画像 */}
              <Image alignSelf="center" size="2xl" resizeMode="contain" source={slide.imageSrc} alt={slide.title} />

              {/* 画像より下の部分 */}
              <VStack alignItems="center" justifyContent="center">
                {slide.messages.map((message) => (
                  <Text w={'90%'} key={message.id} color="white">
                    {message.text}
                  </Text>
                ))}
              </VStack>
            </VStack>
          ))}
        </HStack>
      </ScrollView>

      <CarouselIndicator pages={SLIDES.length} activePage={currentIndex} onChangePage={handleOnChangePage} />

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
    </SafeAreaView>
  );
}
