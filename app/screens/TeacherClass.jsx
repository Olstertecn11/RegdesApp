import React from 'react';
import { Divider, FlatList, Stack, Text, Box, Button, VStack, Select, CheckIcon, Avatar, HStack } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import MenuBar from '../../components/ui/MenuBar';
import { useSession } from '../../context/SessionContext';
import { useRouter } from 'expo-router';
import { getClasses } from '../../services/classes';
import { useIsFocused } from '@react-navigation/native';

const students = [
  {
    id: '1',
    name: 'Juan Pérez',
    class: 'Clase de Jóvenes',
    church: 'Iglesia Central',
  },
  {
    id: '2',
    name: 'María López',
    class: 'Clase de Adultos',
    church: 'Iglesia Central',
  },
  {
    id: '3',
    name: 'Carlos Ramírez',
    class: 'Clase de Adolescentes',
    church: 'Iglesia Central',
  },
  {
    id: '4',
    name: 'Ana González',
    class: 'Clase de Niños',
    church: 'Iglesia Central',
  },
];

const StudentList = () => {
  const renderItem = ({ item }) => (
    <Box p={4} borderBottomWidth={1} borderColor="teal.200">
      <VStack space={2}>
        <Text bold fontSize="md" color="teal.600">
          {item.name}
        </Text>
        <HStack justifyContent="space-between">
          <Text fontSize="sm" color="green.50">
            Clase: {item.class}
          </Text>
          <Text fontSize="sm" color="green.50">
            Iglesia: {item.church}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default function TeacherClass() {

  const { user } = useSession();
  const isFocused = useIsFocused();
  const router = useRouter();
  const [myclass, setMyClass] = React.useState();

  const fetchClasses = async () => {
    const response = await getClasses();
    if (response.status === 200) {
      const _myclass = response.data.find(clase => clase.id === user.clase.id_clase);
      setMyClass(_myclass);
    }
  }


  React.useEffect(() => {
    if (isFocused) {
      fetchClasses();
    }
  }, [isFocused]);

  return (
    <Box bg="#0D0D0D" pt={12} px={4} h="100vh">
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>
      <VStack alignItems="center" mt={4}>
        <Text color="white" fontSize="2xl">Clase
          {myclass && <Text color="white" fontSize="2xl" fontWeight='bold'> {myclass.nombre}</Text>}
        </Text>
      </VStack>
      <Divider mt={20} />
      <StudentList />
    </Box>
  );
}
