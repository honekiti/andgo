import '../utils/polyfills';
import { useEffect } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { white, darkGrey } from '../constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// https://docs.expo.dev/router/advanced/router-settings/
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerStyle: { backgroundColor: darkGrey },
            headerTintColor: white,
          }}
        />

        {/* <Stack
          screenOptions={{
            headerStyle: { backgroundColor: darkGrey },
            headerTintColor: white,
          }}
        >
          <Stack.Screen name="index" options={{ title: 'デバッグ', headerShown: false }} />
          <Stack.Screen
            name="home"
            options={{
              title: 'ホーム',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="config"
            options={{
              presentation: 'card',
              headerStyle: { backgroundColor: darkGrey },
              headerTintColor: white,
            }}
          />
          <Stack.Screen
            name="(onbording)/terms-of-service"
            options={{
              title: '利用規約のご確認',
              presentation: 'card',
              headerStyle: { backgroundColor: darkGrey },
              headerTintColor: white,
            }}
          />
          <Stack.Screen
            name="(onbording)/tutorial"
            options={{
              title: 'チュートリアル',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="exchanges/add"
            options={{
              title: '取引所連携',
              presentation: 'card',
              headerStyle: { backgroundColor: darkGrey },
              headerTintColor: white,
            }}
          />
          <Stack.Screen
            name="exchanges"
            options={{
              title: '取引所',
              presentation: 'card',
              headerStyle: { backgroundColor: darkGrey },
              headerTintColor: white,
            }}
          />
          <Stack.Screen
            name="plans/1"
            options={{
              title: '積立プラン編集',
              presentation: 'card',
              headerStyle: { backgroundColor: darkGrey },
              headerTintColor: white,
            }}
          />
          <Stack.Screen
            name="plans/add"
            options={{
              title: '積立プラン作成',
              presentation: 'card',
              headerStyle: { backgroundColor: darkGrey },
              headerTintColor: white,
            }}
          />
        </Stack> */}
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
