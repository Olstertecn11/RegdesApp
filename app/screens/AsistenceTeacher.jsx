import React, { useState, useEffect } from "react";
import { Pressable, FlatList } from "react-native";
import { Button, Box, Text, HStack, Divider, Spinner } from "native-base";
import { useSession } from "../../context/SessionContext";
import { useIsFocused } from "@react-navigation/native";
import { create_assistence, get_assistence_from_class } from "../../services/assistence";
import { Toast } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import TitleSpan from "../../components/ui/TitleSpan";
import MenuBar from "../../components/ui/MenuBar";




const AsistenceTeacher = () => {
  const isFocused = useIsFocused();
  const { user } = useSession();
  console.log(user);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);


  const closeAssistence = async (fecha) => {
    Toast.show({
      title: `Cerrando asistencia del dia ${fecha}`,
      status: "warning",
      duration: 1000,
      position: "top",
    });
  }

  const createAssistence = async () => {
    const response = await create_assistence(user.clase.id_clase, 1);
    console.log(response);
    setLoading(true);
    if (response.status === 201) {
      Toast.show({
        title: "Asistencia creada correctamente",
        status: "success",
        duration: 1000,
      });
      setTimeout(() => {
        getAsistencias();
        setLoading(false);
      }, 1000);
    }
  };

  const getAsistencias = async () => {
    const response = await get_assistence_from_class(user.clase.id_clase);
    console.log(response);
    if (response.status === 200 && response.data) {
      setAsistencias(response.data);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getAsistencias();
      setLoading(false);
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <Box p={4} borderBottomWidth={1} borderColor="teal.300">
      <HStack justifyContent="space-between">
        <Text bold fontSize="md" color="teal.600" textAlign='center'>
          {item.id}
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign='center'>
          {new Date(item.fecha).toLocaleDateString()}
        </Text>
        <HStack space={2}>

          <Button
            bg='#3A9E7F'
            onPress={() => {
              router.replace(`/screens/AssistenceDetail/${item.id}`);
            }}
          ><AntDesign name="eye" size={14} color="white" /></Button>
          <Button
            onPress={() => closeAssistence(new Date(item.fecha).toLocaleDateString())}
            background={'red.500'}
          ><AntDesign name="closecircle" size={14} color="white" /></Button>
        </HStack>
      </HStack>
    </Box>
  );

  const ListHeader = () => (
    <Box p={4} borderBottomWidth={1} borderColor="teal.300">
      <HStack justifyContent="space-between">
        <Text bold fontSize="md" color="white" textAlign='center'>
          ID
        </Text>
        <Text bold fontSize="md" color="white" textAlign='center'>
          Fecha
        </Text>
        <Text bold fontSize="md" color="white" textAlign='center'>
          Acciones
        </Text>
      </HStack>
    </Box>
  );

  return (
    <Box flex={1} bg="#0D0D0D" p={4}>
      <HStack justifyContent="space-between" alignItems="center" px={4} mb='10%'>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>

      <Text color="white" fontSize="2xl" mb={4}>
        Asistencias Registradas para la clase
      </Text>
      <Text color="#3A9E7F" fontSize="lg" mb={4} fontWeight="bold">
        {user.clase.clase} - {user.user.usuario}
      </Text>
      <Divider mb={2} />
      {loading ? (
        <Spinner color="teal.500" size="lg" mt={4} />
      ) : (
        <FlatList
          data={asistencias}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={
            <Text color="gray.400" textAlign="center" mt={4}>
              No hay registros de asistencia.
            </Text>
          }
        />
      )}
      <Button onPress={createAssistence} mt={4} bg="#3A9E7F">
        Crear Nueva Asistencia
      </Button>
    </Box>
  );
};

export default AsistenceTeacher;
