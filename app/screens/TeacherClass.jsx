import React, { useState, useEffect, useCallback } from "react";
import {
  Divider,
  FlatList,
  VStack,
  Text,
  Box,
  HStack,
  Spinner,
} from "native-base";
import TitleSpan from "../../components/ui/TitleSpan";
import MenuBar from "../../components/ui/MenuBar";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { getClasses, getStudentsByClass } from "../../services/classes";

const StudentList = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;

    const fetchStudents = async () => {
      try {
        const response = await getStudentsByClass(classId);
        if (response.status === 200) {
          setStudents(response.data);
        }
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  const renderItem = ({ item }) => (
    <Box p={4} borderBottomWidth={1} borderColor="teal.200">
      <HStack justifyContent="space-between">
        <Text fontSize="sm" color="green.50" flex={1} textAlign="center">
          {item.id_usuario}
        </Text>
        <Text fontSize="sm" color="green.50" flex={1} textAlign="center">
          {item.estudiante}
        </Text>
      </HStack>
    </Box>
  );

  return loading ? (
    <Spinner color="teal.500" size="lg" mt={4} />
  ) : (
    <Box flex={1}>
      {/* Header de la tabla */}
      <Box bg="teal.700" p={3} borderTopRadius={10}>
        <HStack justifyContent="space-between">
          <Text bold color="white" flex={1} textAlign="center">
            ID Usuario
          </Text>
          <Text bold color="white" flex={1} textAlign='center'>
            Nombre
          </Text>
        </HStack>
      </Box>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <Text color="gray.400" textAlign="center" mt={4}>
            No hay estudiantes en esta clase.
          </Text>
        }
      />
    </Box>
  );
};

export default function TeacherClass() {
  const { user } = useSession();
  const isFocused = useIsFocused();
  const router = useRouter();
  const [myclass, setMyClass] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    if (!user?.clase?.id_clase) return;

    try {
      setLoading(true);
      const response = await getClasses();
      if (response.status === 200) {
        const _myclass = response.data.find(
          (clase) => clase.id === user.clase.id_clase
        );
        setMyClass(_myclass);
      }
    } catch (error) {
      console.error("Error al obtener la clase:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.clase?.id_clase]);

  useEffect(() => {
    if (isFocused) {
      fetchClasses();
    }
  }, [isFocused, fetchClasses]);

  return (
    <Box bg="#0D0D0D" pt={12} px={4} flex={1}>
      {/* Encabezado */}
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={["REG", "DES"]} />
        </Box>
        <MenuBar />
      </HStack>

      {/* Nombre de la Clase */}
      <VStack alignItems="center" mt={4}>
        <Text color="white" fontSize="2xl">
          Clase
          {loading ? (
            <Spinner color="teal.400" size="sm" ml={2} />
          ) : myclass ? (
            <Text color="white" fontSize="2xl" fontWeight="bold">
              {" "}
              {myclass.nombre}
            </Text>
          ) : (
            <Text color="gray.400"> No asignada</Text>
          )}
        </Text>
      </VStack>

      <Divider mt={4} />

      {/* Lista de Estudiantes */}
      <Box flex={1}>
        <StudentList classId={user?.clase?.id_clase} />
      </Box>

      {/* Botón flotante */}
      <TouchableOpacity
        style={{ position: "absolute", bottom: 30, right: 30 }}
        onPress={() => console.log("Agregar nuevo estudiante")}
      >
        <Box
          bg="teal.400"
          w={16}
          h={16}
          borderRadius={100}
          alignItems="center"
          justifyContent="center"
          shadow={3}
        >
          <Text color="white" fontSize="30" textAlign="center">
            +
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
