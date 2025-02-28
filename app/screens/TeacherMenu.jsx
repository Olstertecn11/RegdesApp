
import React from 'react';
import { Input, Text, Box, Button, VStack, Select, CheckIcon, Avatar, HStack } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { assignedMeToClass, getMyAssignedClass, getClasses, getAsignedClasses, _newClass, _newAsignedClass } from '../../services/classes';
import { getChurchs } from '../../services/church';
import { Toast } from 'native-base';
import { useSession } from '../../context/SessionContext';
import MenuBar from '../../components/ui/MenuBar';




export default function TeacherMenu() {
  const router = useRouter();

  const emptyClass = { id_iglesia: '', nombre: '' };



  const [haveClass, setHaveClass] = React.useState(false);
  const [churchs, setChurchs] = React.useState([]);
  const [newClass, setNewClass] = React.useState(emptyClass);

  const isFocused = useIsFocused();
  const { user, saveSession } = useSession();

  const fetch = async () => {
    const response = await getMyAssignedClass(user.user.id);
    console.log('myresponse');
    console.log(response);
    if (response.status === 200) {
      if (response.data) {
        const _haveClass = response.data;
        console.log('have class', _haveClass);
        setHaveClass(_haveClass);
        saveSession({ ...user, clase: _haveClass });
        router.push('/screens/TeacherDashboard', { id_clase: _haveClass.id_clase });
      }
      else {
        setHaveClass(false);
      }
    }



    const responseChurchs = await getChurchs();
    if (responseChurchs.status === 200) {
      setChurchs(responseChurchs.data);
    }
  }

  React.useEffect(() => {
    if (isFocused) {
      fetch();
    }

  }, [isFocused]);

  const createClass = async () => {
    console.log('creating')
    const response_created = await _newClass(newClass);
    console.log(response_created);
    if (response_created.status === 201) {
      const class_id = response_created.data.id_clase;
      const response = await assignedMeToClass(user.user.id, class_id, false);
      console.log(response);
      if (response.status === 201) {
        saveSession({ ...user, clase: class_id });
        Toast.show({
          title: 'Clase creada',
          status: 'success'
        });
        setTimeout(() => {
          router.push('/screens/TeacherMenu');
        }, 1000);
        return;
      }
      Toast.show({
        title: 'Error al crear la clase',
        status: 'error'
      });
    }
  }



  return (

    <Box bg="#0D0D0D" pt={12} px={4} h="100vh">
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>
      <VStack space={4} mt={8}>
        <Text color="white" fontSize="2xl">
          Bienvenid@{' '}
          <Text as="span" color="red" fontWeight='bold'>
            {user.user.usuario}
          </Text>
        </Text>

        <Text color="teal.200" fontSize="2xl">
          {haveClass ? 'Tienes una clase asignada' : 'No tienes ninguna clase asignada'}
        </Text>


        {!haveClass && (
          <Box w="100%">
            <Select
              placeholder="Selecciona una iglesia..."
              bg="gray.800"
              onValueChange={(value) => setNewClass(prev => ({ ...prev, id_iglesia: value }))}
              color="white"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {churchs.map((church) => (
                <Select.Item key={church.id} value={church.id} label={church.nombre} />
              ))}
            </Select>
            <Input placeholder="Nombre de la clase" bg="gray.800" color="white" mt={4}
              onChangeText={(value) => setNewClass({
                ...newClass, nombre: value
              })}
            />
            <Button mt={4} colorScheme="teal" w="100%" onPress={createClass}>
              Crear clase
            </Button>
          </Box>
        )
        }
      </VStack>
    </Box>
  );




}
