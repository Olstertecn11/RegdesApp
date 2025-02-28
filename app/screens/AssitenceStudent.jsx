import { Divider, HStack, Box, Text, Switch, VStack, Button, Card } from "native-base";
import React, { useState, useEffect } from "react";
import { Toast } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { useSession } from "../../context/SessionContext";
import { get_assistence_from_class, get_student_assistence, create_student_assistence } from "../../services/assistence";
import TitleSpan from '../../components/ui/TitleSpan';
import MenuBar from '../../components/ui/MenuBar';


const AssistenceStudent = () => {
  const isFocused = useIsFocused();
  const { user } = useSession();
  const [assistenceData, setAssistenceData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [confirmedAssistence, setConfirmedAssistence] = useState(null);
  const [noConfirmedAssistence, setNoConfirmedAssistence] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const fetchAssistence = async () => {
    setLoading(true);
    const response = await get_assistence_from_class(user.clase.id_clase);
    if (response.status === 200 && response.data.length > 0) {
      setAssistenceData(response.data[0]);
      const _response = await get_student_assistence(user.clase.id_clase);
      const filtered_assistence = _response.data.filter((a) => a.id_estudiante === user.user.id);
      // create a new array that contains if filteres_assistence match with response item return {response_item.id, response_item.fecha, filtered_assistence_item.status} if not return {response_item.id, response_item.fecha, 0}
      const assistenceData = response.data.map((response_item) => {
        const filtered_assistence_item = filtered_assistence.find((a) => a.id_asistencia === response_item.id);
        if (filtered_assistence_item && filtered_assistence_item.status === 1) {
          return {
            ...response_item,
            status: 1
          };

        } else {
          return {
            ...response_item,
            status: 0
          };
        }
      });

      const no_confirmed = assistenceData.find((a) => a.status === 0);
      const confirmed_assistence = assistenceData.filter((a) => a.status === 1);
      setConfirmedAssistence(confirmed_assistence);
      setNoConfirmedAssistence(no_confirmed);
    }
    setLoading(false);
  };

  const handleAssistenceToggle = async () => {
    setConfirmed(true);
    const response = await create_student_assistence(noConfirmedAssistence.id, user.user.id, 1);
    if (response.status === 201) {
      Toast.show({
        title: "Asistencia confirmada",
        status: "success",
        description: "Se ha confirmado tu asistencia.",
        duration: 3000,
        isClosable: true,
      })
      setTimeout(() => {
        setConfirmed(false);
        fetchAssistence();
      }, 1000);
      return;
    }

    Toast.show({
      title: "Error",
      status: "error",
      description: "Hubo un error al confirmar tu asistencia.",
      duration: 3000,
      isClosable: true,
    })
  };

  useEffect(() => {
    if (isFocused) {
      fetchAssistence();
    }
  }, [isFocused]);


  return (
    <Box flex="1" bg="blueGray.900" p="5">
      <HStack justifyContent="space-between" alignItems="center" px={4} mb='10%'>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>

      <VStack space="2" alignItems="center" mt={'10%'}>
        <Text color="white" fontSize="2xl" fontWeight="bold">Asistencia del Estudiante</Text>

        {loading ? (
          <Text color="gray.400">Cargando datos...</Text>
        ) : noConfirmedAssistence ? (
          <Card bg="gray.800" p="5" rounded="lg" w="90%" borderColor={'red.700'} borderWidth={1}>
            <VStack space="4">
              <Text color="white" fontSize="lg">
                📅 Fecha: <Text fontWeight="bold">{new Date(noConfirmedAssistence.fecha).toLocaleDateString()}</Text>
              </Text>
              <Text color="white" fontSize="lg">
                📚 Clase: <Text fontWeight="bold">{user.clase.clase}</Text>
              </Text>
              <Text color="white" fontSize="lg">
                ✅ Estado: <Text fontWeight="bold">{noConfirmedAssistence.status === 1 ? "Confirmado" : "Pendiente"}</Text>
              </Text>

              <VStack space="2" alignItems="center">
                <Switch
                  onToggle={handleAssistenceToggle}
                  offTrackColor="gray.400"
                  onTrackColor="emerald.500"
                  size={'lg'}
                  scale={2}
                  isChecked={confirmed}

                />

              </VStack>
            </VStack>
          </Card>
        ) : (
          <Text color="gray.400">No hay asistencia registrada.</Text>
        )}
      </VStack>
      <Divider my={5} bg="gray.700" />
      <Text textAlign='center' mt={10} color="white" fontSize="2xl" fontWeight="bold">Historial de Asistencias</Text>
      {confirmedAssistence && confirmedAssistence.length > 0 && (
        <VStack space="4" mt="5" alignItems={'center'}>
          {confirmedAssistence.map((a) => (
            <Card bg="gray.900" p="5" rounded="lg" w="90%" key={a.id} borderColor={'green.700'} borderWidth={1}>
              <VStack space="4">
                <Text color="white" fontSize="lg">
                  📅 Fecha: <Text fontWeight="bold">{new Date(a.fecha).toLocaleDateString()}</Text>
                </Text>
                <Text color="white" fontSize="lg">
                  📚 Clase: <Text fontWeight="bold">{user.clase.clase}</Text>
                </Text>
                <Text color="white" fontSize="lg">
                  ✅ Estado: <Text fontWeight="bold">Confirmado</Text>
                </Text>
              </VStack>
            </Card>
          ))}
        </VStack>
      )
      }
    </Box>
  );
};

export default AssistenceStudent;
