import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';

export function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-Medium': Montserrat_500Medium,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Montserrat-Bold': Montserrat_700Bold,
    'Lato-Regular': Lato_400Regular,
    'Lato-Bold': Lato_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we load resources
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn('Error loading resources:', e);
      } finally {
        setIsLoadingComplete(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return {
    isLoadingComplete,
    fontsLoaded,
    fontError,
  };
}