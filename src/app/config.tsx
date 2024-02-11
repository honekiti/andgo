import { Box, Button, Icon, Image, ButtonText, ChevronRightIcon } from '@gluestack-ui/themed';
import { Stack, Link } from 'expo-router';
import { white, unclearWhite, darkGrey } from '../constants/Colors';

export default function ConfigScreen() {
  return (
    <Box flexDirection="column" flex={1} bg={darkGrey}>
      <Stack.Screen
        options={{
          title: '設定',
          presentation: 'card',
        }}
      />

      <Box width="100%" height="90%">
        <Link href="/exchanges" asChild>
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
            source={require('../../assets/images/logo.png')}
            alt="logo"
          />
        </Box>
      </Box>
    </Box>
  );
}
