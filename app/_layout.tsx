import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
    'Inter-BlackItalic': require('../assets/fonts/Inter-BlackItalic.otf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.otf'),
    'Inter-BoldItalic': require('../assets/fonts/Inter-BoldItalic.otf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.otf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter-ExtraLight-BETA.otf'),
    'Inter-ExtraLightItalic': require('../assets/fonts/Inter-ExtraLightItalic-BETA.otf'),
    'Inter-Italic': require('../assets/fonts/Inter-Italic.otf'),
    'Inter-Light': require('../assets/fonts/Inter-Light-BETA.otf'),
    'Inter-LightItalic': require('../assets/fonts/Inter-LightItalic-BETA.otf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.otf'),
    'Inter-MediumItalic': require('../assets/fonts/Inter-MediumItalic.otf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.otf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.otf'),
    'Inter-SemiBoldItalic': require('../assets/fonts/Inter-SemiBoldItalic.otf'),
    'Inter-Thin': require('../assets/fonts/Inter-Thin-BETA.otf'),
    'Inter-ThinItalic': require('../assets/fonts/Inter-ThinItalic-BETA.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}