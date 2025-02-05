import React from 'react';
import { Text, Box, Button, VStack, Select, CheckIcon, Avatar, HStack } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { getChurchs } from '../../services/church';
import { getClasses } from '../../services/classes';
import { useSession } from '../../context/SessionContext';
import MenuBar from '../../components/ui/MenuBar';

export default function InitialMenu() {
  const { user, saveSession } = useSession();
  const [selectedChurch, setSelectedChurch] = React.useState('');
  const [selectedClass, setSelectedClass] = React.useState('');
  const [churchs, setChurchs] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [filteredClasses, setFilteredClasses] = React.useState([]);
  const [canContinue, setCanContinue] = React.useState(false);

  const router = useRouter();
  const isFocused = useIsFocused();

  const handleContinue = () => {
    if (!selectedChurch || !selectedClass) return;
    console.log(selectedChurch);
    console.log(selectedClass);
    const selcted_class = { id_church: selectedChurch, id_class: selectedClass };
    saveSession({ ...user, selcted_class });
    router.push('/screens/Dashboard');
  };

  React.useEffect(() => {
    if (isFocused) {
      const fetch = async () => {
        const response = await getChurchs();
        if (response.status === 200) {
          setChurchs(response.data);
        }

        const responseClasses = await getClasses();
        if (responseClasses.status === 200) {
          setClasses(responseClasses.data);
        }
      };
      fetch();
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (selectedChurch) {
      const filtered = classes.filter(
        (clase) => clase.id_iglesia === parseInt(selectedChurch)
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses([]);
    }

  }, [selectedChurch, classes]);


  React.useEffect(() => {
    if (selectedClass) {
      setCanContinue(true);
      return;
    }
    setCanContinue(false);
  }, [selectedClass]);

  return (
    <Box bg="#0D0D0D" pt={12} px={4} h="100vh">
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>

      <VStack space={6} alignItems="center" px={8} mt={12}>
        <Select
          placeholder="Selecciona una iglesia..."
          bg="gray.800"
          color="white"
          h="50px"
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
          {churchs.map((church) => (
            <Select.Item key={church.id} label={church.nombre} value={church.id.toString()} />
          ))}
        </Select>

        <Select
          placeholder="Selecciona una clase..."
          bg="gray.800"
          color="white"
          borderRadius="10"
          fontSize={16}
          mt={6}
          h="50px"
          isDisabled={filteredClasses.length === 0}
          borderWidth="0"
          w="100%"
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          _selectedItem={{
            bg: 'gray.700',
            endIcon: <CheckIcon size="5" color="white" />,
          }}
        >
          {filteredClasses.map((clase) => (
            <Select.Item key={clase.id} label={clase.nombre} value={clase.id.toString()} />
          ))}
        </Select>
        {filteredClasses.length === 0 && (
          <Box w="100%" px={4}>
            <Text color="red.500" fontSize={14}>
              No hay clases disponibles para esta iglesia
            </Text>
          </Box>
        )}

        <Button
          mt="5"
          bg="#3A9E7F"
          w="40%"
          isDisabled={!canContinue}
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
