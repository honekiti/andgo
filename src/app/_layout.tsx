import '../utils/polyfills';
import { useEffect } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { white, darkGrey } from '../constants/Colors';
import { store } from '../store';
import { registerBackgroundFetchAsync, useForegroundIntervalProcess } from '../services/scheduler-service';
import { addNotificationListener } from '../services/notification-service';

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

  useForegroundIntervalProcess();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const f = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();

        await registerBackgroundFetchAsync();
      }
    };

    // Async
    f();

    const finalizer = addNotificationListener((notification) => {
      console.log('notification is received', JSON.stringify(notification));
    });

    return () => finalizer();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <JotaiProvider store={store}>
      <GluestackUIProvider config={config}>
        <Stack
          // 全スクリーン共通の設定
          screenOptions={{
            headerStyle: { backgroundColor: darkGrey },
            headerTintColor: white,
          }}
        />
      </GluestackUIProvider>
    </JotaiProvider>
  );
}
