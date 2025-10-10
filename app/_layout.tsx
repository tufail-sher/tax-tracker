import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
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

  const [forceReady, setForceReady] = useState(false);

  useEffect(() => {
    console.log('[TaxTracker] RootLayout mounted, loaded:', loaded, 'error:', error);
    
    // Force hide splash after 2 seconds even if fonts aren't loaded
    const fallbackTimer = setTimeout(() => {
      console.log('[TaxTracker] Fallback timer triggered - forcing splash to hide');
      setForceReady(true);
      SplashScreen.hideAsync().catch((err) => {
        console.error('[TaxTracker] Error hiding splash (fallback):', err);
      });
    }, 2000);

    if (loaded || error) {
      console.log('[TaxTracker] Fonts loaded or error occurred, hiding splash screen');
      clearTimeout(fallbackTimer);
      SplashScreen.hideAsync().catch((err) => {
        console.error('[TaxTracker] Error hiding splash:', err);
      });
    }

    return () => clearTimeout(fallbackTimer);
  }, [loaded, error]);

  if (!loaded && !error && !forceReady) {
    console.log('[TaxTracker] Fonts not loaded yet, waiting...');
    return null;
  }

  console.log('[TaxTracker] RootLayout rendering with fonts loaded');

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="intro" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgot" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="scanner" options={{ headerShown: false }} />
        <Stack.Screen name="invoice-details" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}