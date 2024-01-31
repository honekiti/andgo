import {
  Box,
  Button,
  GluestackUIProvider,
  Text,
  ScrollView,
  Icon,
  CloseIcon,
  ChevronLeftIcon,
  SettingsIcon,
  Image,
  Checkbox,
  CheckIcon,
  CheckboxIcon,
  CheckboxLabel,
  CheckboxIndicator,
} from '@gluestack-ui/themed';
import React from 'react';
import { config } from '@gluestack-ui/config';
import { StyleSheet, Linking, Animated, TouchableOpacity, Dimensions, Settings } from 'react-native';
import { useState } from 'react';

export default function ConfigScreen() {
  return (
    <GluestackUIProvider config={config}>
      <Home />
    </GluestackUIProvider>
  );
}
const Home = () => {
  return <Container />;
};

// Container コンポーネント
const Container = () => {
  const [isScrollViewVisible, setIsScrollViewVisible] = useState(true); //画面切り替えの初期値
  const [currentScreen, setcurrentScreen] = useState<string>('setting');

  const openLink = () => {
    Linking.openURL('https://tsumitatetoko.com/news');
  };

  return (
    <Box flexDirection="column" flex={1} backgroundColor="$black">
      {currentScreen === 'setting' &&
        (isScrollViewVisible ? (
          <ScrollView style={{ height: '100%' }}>
            <Box
              flexDirection="column"
              justifyContent="center" // 要素間のスペースを最大化
              alignItems="center"
              backgroundColor="$#333333"
              height="150%"
              width="100%"
              sx={{
                '@base': {
                  my: '60%',
                  mx: '0%',
                },
                '@lg': {
                  my: '$24',
                  mx: '$32',
                },
              }}
            >
              <Box width="100%" height="5%" flexDirection="row" justifyContent="center" alignItems="center">
                <TouchableOpacity style={{ position: 'absolute', left: '5%' }} onPress={() => setIsScrollViewVisible(false)}>
                  <Icon as={CloseIcon} size="xl" color="white" />
                </TouchableOpacity>
                <Text color="white" fontSize={22} fontWeight="$medium">
                  設定
                </Text>
              </Box>

              <Box width="100%" height="90%">
                <DiscriptionCard2 name="取引所" onPress={() => setcurrentScreen('exScreen')} />
                <DiscriptionCard2 name="利用規約" onPress={() => setcurrentScreen('TermsOfService')} />
                <DiscriptionCard2 name="最新リリース情報" onPress={openLink} />

                <Box flex={1} alignItems="center">
                  <Image
                    size="2xs"
                    bgColor="$#333333"
                    style={{ width: '30%', height: '10%' }}
                    resizeMode="contain"
                    source={require('./assets/Union.png')}
                  />
                </Box>
              </Box>
            </Box>
          </ScrollView>
        ) : (
          // ScrollView が非表示の場合に表示されるコンテンツ
          <Box flex={1} position="relative">
            <TouchableOpacity
              onPress={() => setIsScrollViewVisible(true)}
              style={{
                position: 'absolute', // 子コンポーネントの位置を絶対位置で指定
                top: 70, // 親コンポーネントの上端からの距離
                right: 30, // 親コンポーネントの右端からの距離
              }}
            >
              <Icon as={SettingsIcon} size="xl" color="white" />
            </TouchableOpacity>
          </Box>
        ))}

      {currentScreen === 'exScreen' && <ExScreen goBack={() => setcurrentScreen('setting')} />}

      {currentScreen === 'TermsOfService' && <TermsOfService goBack={() => setcurrentScreen('setting')} />}
    </Box>
  );
};

interface DiscriptionCard2Props {
  name: string;
  onPress: () => void;
}

const DiscriptionCard2 = ({ name, onPress }: DiscriptionCard2Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'column', width: '100%', height: '7%', justifyContent: 'center', borderBottomWidth: 2, borderColor: '#FFFFFF50' }}
    >
      <Box alignItems="center" display="flex" flexDirection="row" m="$0" p="$4">
        <Text width="100%" fontSize={20} color="$white">
          {name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

// ExScreen コンポーネントのプロパティ型を定義
interface ExScreenProps {
  goBack: () => void;
}

// ExScreen コンポーネント
const ExScreen: React.FC<ExScreenProps> = ({ goBack }) => {
  return (
    <Box flex={1} backgroundColor="#333333">
      <Box
        width="100%"
        height={'5%'}
        flexDirection="row"
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="center"
        justifyContent="center"
        marginTop={'20%'}
      >
        <TouchableOpacity onPress={goBack} style={{ position: 'absolute', left: '5%' }}>
          <Icon as={ChevronLeftIcon} size={'xl'} color="white" />
        </TouchableOpacity>
        <Text color="white" fontSize={22}>
          取引所
        </Text>
      </Box>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          Krarken
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          Bitbank
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          coincheck
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box
        flexDirection="column"
        width="100%"
        height={'10%'}
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="flex-start"
        justifyContent="center"
        p={'$4'}
      >
        <Text color="white" fontSize={22}>
          bitFlyer
        </Text>
        <Text color="white">残高 123456円</Text>
      </Box>
      <Box flexDirection="row" width="100%" height={'8%'} borderTopWidth={2} borderTopColor="#404040" alignItems="center" p={'$4'} marginTop={'70%'}>
        <Text color="white" fontSize={18}>
          取引所と連携しよう
        </Text>

        <Box height={'100%'} width={'23%'} bgColor="white" justifyContent="center" alignItems="center" marginLeft={'35%'} borderRadius={'$full'}>
          <TouchableOpacity>
            <Text color="black" fontSize={20}>
              連携
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

// TermsOfService コンポーネントのプロパティ型を定義
interface TermsOfServiceProps {
  goBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ goBack }) => {
  return (
    <Box flex={1} backgroundColor="#333333">
      <Box
        width="100%"
        height={'5%'}
        flexDirection="row"
        borderBottomWidth={2}
        borderBottomColor="#FFFFFF50"
        alignItems="center"
        justifyContent="center"
        marginTop={'20%'}
      >
        <TouchableOpacity onPress={goBack} style={{ position: 'absolute', left: '5%' }}>
          <Icon as={ChevronLeftIcon} size={'xl'} color="white" />
        </TouchableOpacity>
        <Text color="white" fontSize={20}>
          利用規約のご確認
        </Text>
      </Box>
      <ScrollView flex={1} flexDirection="column" width={'100%'} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Box height={'20%'} />
        <Box justifyContent="center" alignItems="center" height={'30%'} width={'90%'} marginTop={'15%'} bgColor="#525252" borderRadius={'$lg'}>
          <Checkbox value="somevalue" size="lg" isInvalid={false} isDisabled={false}>
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>

          <Text color="white">アプリをお使い頂くにあたり</Text>
          <Text color="white">利用規約に同意して頂く必要があります</Text>
        </Box>

        <Text color="white" marginTop={'10%'} fontSize={22} fontWeight="$medium">
          利用規約
        </Text>
        <Box height={'6%'} />
        <Text width={'90%'} color="white">
          本利用規約（以下「本規約」といいます。）には、株式会社AndGo（以下「当社」といいます。）の提供する本サービス（第2条に定義）のご利用にあたり、ユーザーの皆様に遵守していただかなければならない事項及び当社とユーザーの皆様との間の権利義務関係が定められております。本サービスをご利用になる方は、本規約に同意する前に、必ず全文お読み下さいますようお願い致します。
        </Text>
        <Box height={'6%'} />
        <Text width={'90%'} height={'7%'} color="white" fontWeight="$medium">
          第1条 適 用
        </Text>
        <Text width={'90%'} height={'20%'} color="white">
          1.
          本規約は、本サービスの利用に関する当社と登録ユーザー（第2条に定義）との間の権利義務関係を定めることを目的とし、登録ユーザーと当社の間の本サービスの利用に関わる一切の関係に適用されます。
        </Text>
        <Text width={'90%'} color="white">
          2. 当社が本アプリケーション等（第2条に定義）上で随時掲載する本サービスに関するルール、諸規定等は本規約の一部を構成するものとします。
        </Text>
      </ScrollView>
    </Box>
  );
};
