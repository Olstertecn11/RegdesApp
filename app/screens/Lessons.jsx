
import React from "react";
import { Box, VStack, HStack, Text, Divider, ScrollView } from "native-base";
import { getLessons } from '../../services/lessons';
import { useIsFocused } from "@react-navigation/native";

const Lessons = () => {
  const [lessons, setLessons] = React.useState([]);
  const isFocused = useIsFocused();

  const fetch = async () => {
    const response = await getLessons();
    if (response.status === 200) {
      setLessons(response.data);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch();
    }
  }, [isFocused]);



  return (
    <Box bg="#0D0D0D" flex={1} p={4}>
      <Text fontSize="2xl" color="white" fontWeight="bold" mb={4}>
        Lecciones
      </Text>
      <ScrollView>
        <VStack space={4}>
          {lessons.map((lesson) => (
            <Box
              key={lesson.id}
              bg="gray.800"
              p={4}
              borderRadius="10"
              shadow={2}
            >
              <HStack justifyContent="space-between">
                <Text color="white" fontSize="lg" fontWeight="bold">
                  {lesson.titulo}
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {new Date(lesson.fecha).toISOString().split("T")[0]}
                </Text>
              </HStack>
              <Divider my={2} bg="gray.600" />
              <Text color="gray.300" textAlign={'justify'}>{lesson.contenido}</Text>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Lessons;
