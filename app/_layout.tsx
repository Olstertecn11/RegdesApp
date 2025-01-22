import type { ReactNode } from 'react';
import { Stack } from 'expo-router';
import { NativeBaseProvider, Box } from 'native-base';
import { SessionProvider } from '@/context/SessionContext';

export default function RootLayout(): ReactNode {
  return (
    <NativeBaseProvider>
      <SessionProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SessionProvider>
    </NativeBaseProvider>
  );
}

