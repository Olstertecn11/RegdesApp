import type { ReactNode } from 'react';
import { Stack } from 'expo-router';
import { NativeBaseProvider, Box } from 'native-base';

export default function RootLayout(): ReactNode {
  return (
    <NativeBaseProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </NativeBaseProvider>
  );
}

