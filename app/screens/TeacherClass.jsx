import React from 'react';
import { Text, Box, Button, VStack, Select, CheckIcon, Avatar, HStack } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import MenuBar from '../../components/ui/MenuBar';
import { useSession } from '../../context/SessionContext';
import { useRouter } from 'expo-router';
import { getClasses } from '../../services/classes';
import { useIsFocused } from '@react-navigation/native';

export default function TeacherClass() {

  const { user } = useSession();
  const isFocused = useIsFocused();
  const router = useRouter();
  const { id_clase } = router.params;
  const [myclass, setMyClass] = React.useState(null);

  const fetchClasses = async () => {
    const response = await getClasses();
    if (response.status === 200) {
      console.log(response.data);
      const _myclass = response.data.find(clase => clase.id_clase === id_clase);
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
          {myclass && <Text color="white" fontSize="2xl"> {myclass.nombre}</Text>}
        </Text>
      </VStack>

    </Box>
  );
}
