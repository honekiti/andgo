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
  ButtonText,
  ChevronRightIcon,
} from '@gluestack-ui/themed';
import React from 'react';
import { config } from '@gluestack-ui/config';
import { StyleSheet, Linking, Animated, TouchableOpacity, Dimensions, Settings } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import TermsOfServiceScreen from './(onbording)/terms-of-service';
import ExchangeListScreen from './(exchange)/exchange-list';
import { white, unclearWhite, darkGrey } from '../constants/Colors';

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
    <Box flexDirection="column" flex={1} bg={darkGrey}>
      <Box width="100%" height="90%">
        <Link href="/(exchange)/exchange-list" asChild>
          <Button height={'10%'} bg={darkGrey} justifyContent="space-between" borderBottomWidth={0.3} borderColor={unclearWhite}>
            <ButtonText textAlign="left">取引所</ButtonText>
            <Icon as={ChevronRightIcon} size="lg" color={white} />
          </Button>
        </Link>
        <Link href="/(onbording)/terms-of-service" asChild>
          <Button height={'10%'} bg={darkGrey} justifyContent="space-between" borderBottomWidth={0.3} borderColor={unclearWhite}>
            <ButtonText textAlign="left">利用規約</ButtonText>
            <Icon as={ChevronRightIcon} size="lg" color={white} />
          </Button>
        </Link>
        <Link href="https://tsumitatetoko.com/news" asChild>
          <Button height={'10%'} bg={darkGrey} justifyContent="space-between" borderBottomWidth={0.3} borderColor={unclearWhite}>
            <ButtonText textAlign="left">最新リリース情報</ButtonText>
            <Icon as={ChevronRightIcon} size="lg" color={white} />
          </Button>
        </Link>

        <Box flex={1} alignItems="center">
          <Image
            size="xs"
            bgColor="#0000"
            style={{ width: '40%', height: '20%' }}
            resizeMode="contain"
            source={require('../assets/images/Union.png')}
          />
        </Box>
      </Box>
    </Box>
  );
};
