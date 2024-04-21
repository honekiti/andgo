import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from '@gluestack-ui/themed';
import { darkGrey } from '../../constants/Colors';

export default function ChangeLogs() {
  return (
    <SafeAreaView flex={1} bg={darkGrey}>
      <Stack.Screen
        options={{
          title: '最新リリース情報',
          presentation: 'card',
        }}
      />
      <WebView source={{ uri: 'https://tsumitatetoko.com/news' }} />
    </SafeAreaView>
  );
}
