import React from "react";
import { Box, VStack, HStack, Text, Avatar, Pressable, Center } from "native-base";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import TitleSpan from "../../components/ui/TitleSpan";
import MenuBar from "../../components/ui/MenuBar";
import { useRouter } from "expo-router";

const TeacherDashboard = () => {
  return (
    <Box flex={1} bg="black" safeArea px={5} py={3}>
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>

      <Center flex={1} mt={-40} pt={0}>
        <VStack space={5}>
          <HStack space={5}>
            <PressableCard icon="user" label="Estudiantes" iconLib="FontAwesome" href='/screens/TeacherClass' />
            <PressableCard icon="calendar-check-outline" label="Asistencia" href='/screens/AsistenceTeacher' />
          </HStack>
          <HStack space={5}>
            <PressableCard icon="ab-testing" label="Pruebas" iconLib="MaterialCommunityIcons" href="/screens/Informe" />
            <PressableCard icon="graph" label="Estadísticas" href="/screens/TeacherStatics" />
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};


const PressableCard = ({ icon, label, href = '', iconLib = "MaterialCommunityIcons" }) => {
  const IconComponent = iconLib === "FontAwesome" ? FontAwesome : MaterialCommunityIcons;
  const router = useRouter();

  const _redirect = () => {
    router.replace(href);
  }


  return (
    <Pressable
      w={'150px'} h={32}
      bg="gray.700"
      rounded="xl"
      justifyContent="center"
      onPress={_redirect}
      alignItems="center"
      _pressed={{ bg: "gray.600" }}
    >
      <IconComponent name={icon} size={40} color="white" />
      <Text mt={2} fontSize="md" bold color="white">
        {label}
      </Text>
    </Pressable>
  );
};

export default TeacherDashboard;
