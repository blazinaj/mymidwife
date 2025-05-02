import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useCachedResources } from '@/hooks/useCachedResources';
import { colors } from '@/constants/theme';
import { View, StyleSheet } from 'react-native';
import AppText from '@/components/common/AppText';

export default function RootLayout() {
  useFrameworkReady();
  const { isLoadingComplete, fontsLoaded, fontError } = useCachedResources();

  if (!isLoadingComplete || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <AppText>Loading...</AppText>
      </View>
    );
  }

  if (fontError) {
    return (
      <View style={styles.errorContainer}>
        <AppText>Error loading fonts. Please restart the app.</AppText>
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="dark" backgroundColor={colors.neutral.white} />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    padding: 16,
  },
});