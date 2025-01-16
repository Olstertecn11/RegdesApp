import React from 'react';
import { Box, Button, VStack, Select, CheckIcon, Avatar, HStack, Text } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import { useRouter } from 'expo-router';

export default function InitialMenu() {
  const [selectedChurch, setSelectedChurch] = React.useState('');
  const [selectedClass, setSelectedClass] = React.useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (selectedChurch && selectedClass) {
      router.replace('/screens/Dashboard');

    } else {
      console.log('Por favor selecciona una iglesia y una clase');
    }
  };

  return (
    <Box bg="#0D0D0D" pt={12} px={4} h="100vh">
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <Avatar
          size="lg"
          source={{ uri: 'https://via.placeholder.com/150' }}
          mt={4}
        />
      </HStack>

      <VStack space={6} alignItems="center" px={8} mt={12}>
        <Select
          placeholder="Selecciona una iglesia..."
          bg="gray.800"
          color="white"
          h='50px'
          borderRadius="10"
          fontSize={16}
          w="100%"
          borderWidth="0"
          selectedValue={selectedChurch}
          onValueChange={(itemValue) => setSelectedChurch(itemValue)}
          _selectedItem={{
            bg: 'gray.700',
            endIcon: <CheckIcon size="5" color="white" />,
          }}
        >
          <Select.Item label="Iglesia Central" value="central" />
          <Select.Item label="Iglesia Norte" value="norte" />
          <Select.Item label="Iglesia Sur" value="sur" />
        </Select>

        <Select
          placeholder="Selecciona una clase..."
          bg="gray.800"
          color="white"
          borderRadius="10"
          fontSize={16}
          mt={6}
          h='50px'
          borderWidth="0"
          w="100%"
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          _selectedItem={{
            bg: 'gray.700',
            endIcon: <CheckIcon size="5" color="white" />,
          }}
        >
          <Select.Item label="Clase Jóvenes" value="jovenes" />
          <Select.Item label="Clase Adultos" value="adultos" />
          <Select.Item label="Clase Niños" value="ninos" />
        </Select>

        <Button
          mt="5"
          bg="#3A9E7F"
          w="40%"
          borderRadius="25px"
          _pressed={{ bg: '#317C68' }}
          onPress={handleContinue}
        >
          Continuar...
        </Button>
      </VStack>
    </Box>
  );
}
