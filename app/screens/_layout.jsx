
import { Slot } from 'expo-router';
import { Box } from 'native-base';

export default function Layout() {
  return (
    <Box h={'100%'} w={'100%'} mt='0' bg='#0D0D0D' >
      <Slot />
    </Box>
  )
}
