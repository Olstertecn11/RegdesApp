
import { Slot } from 'expo-router';
import { Box } from 'native-base';
import React from 'react';
import { SessionProvider } from '../../context/SessionContext';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Layout() {

  const isFocused = useIsFocused();
  const router = useRouter();

  React.useEffect(() => {
    if (isFocused) {
      const fetch = async () => {
        const session = await AsyncStorage.getItem('user');
        if (session) {
          console.log('Session found');
        } else {
          const route = router.getCurrentRoute();
          console.log('Route:', route);
          router.replace("/");
        }
      }
      fetch();
    }
  }, [isFocused]);

  return (
    <Box h={'100%'} w={'100%'} mt='0' bg='#0D0D0D' >
      <Slot />
    </Box>
  )
}
