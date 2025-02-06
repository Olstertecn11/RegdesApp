
import { Slot } from 'expo-router';
import { Box } from 'native-base';
import React from 'react';
import { SessionProvider } from '../../context/SessionContext';
import { useIsFocused } from '@react-navigation/native';

export default function Layout() {

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      console.log('Layout isFocused');
    }
  }, [isFocused]);

  return (
    <Box h={'100%'} w={'100%'} mt='0' bg='#0D0D0D' >
      <Slot />
    </Box>
  )
}
