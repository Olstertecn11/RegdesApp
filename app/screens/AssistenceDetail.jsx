import React from "react";
import { Divider, Box, Text, HStack } from "native-base";
import TitleSpan from "../../components/ui/TitleSpan";
import MenuBar from "../../components/ui/MenuBar";
import { useLocalSearchParams } from "expo-router";
import { Toast } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { useSession } from "../../context/SessionContext";
import { get_assistence_list_from_class } from "../../services/assistence";

const AssistenceDetail = () => {
  const params = useLocalSearchParams();
  const isFocused = useIsFocused();
  const { fecha, id } = params;
  const { user } = useSession();
  const [asistencias, setAsistencias] = React.useState([]);


  const fetchAssistence = async () => {

    var fecha_formatted = fecha.split('/');
    const day = fecha_formatted[0].length === 1 ? `0${fecha_formatted[0]}` : fecha_formatted[0];
    fecha_formatted = `${fecha_formatted[2]}-${day}-${fecha_formatted[1]}`;

    const response = await get_assistence_list_from_class(user.clase.id_clase, fecha_formatted);
    if (response.status === 200) {
      setAsistencias(response.data);
      return;
    }
    setAsistencias([]);
    Toast.show({
      title: "Error al cargar asistencias",
      status: "error",
      duration
    });
  };



  React.useEffect(() => {
    if (isFocused) {
      fetchAssistence();
    }
  }, [isFocused]);

  return (
    <Box flex={1} p={4}>
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>
      <Text mt={'10%'} fontSize={'25'} color='teal.100' fontWeight='bold' textAlign='center'>Asistencias del {fecha} </Text>
      <Divider my={4} />
      {
        // Iterate all asistencias and render them
        asistencias.map((item, index) => (
          <Box p={4} borderBottomWidth={1} borderColor={`${item.asistencia > 0 ? 'teal.300' : 'red.400'}`} key={index} bg='gray.800' borderRadius={6}>
            <HStack justifyContent="space-between">
              <Text bold fontSize="md" color="white" textAlign='center'>
                {item.usuario}
              </Text>
              <Text bold fontSize="md" color={`${item.asistencia > 0 ? 'teal.600' : 'red.400'}`} textAlign='center'>
                {item.asistencia > 0 ? 'Presente' : 'Ausente'}
              </Text>
            </HStack>
          </Box>
        ))
      }
    </Box>
  );

};

export default AssistenceDetail;
