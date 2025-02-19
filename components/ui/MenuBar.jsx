import { Avatar, Text, Box, Menu, Pressable } from "native-base";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession } from "../../context/SessionContext";
import { Toast } from "native-base";
import profile_image from '../../assets/images/profile_image.jpg'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { constants } from '../../constants/env';
import { useRouter } from 'expo-router';

const MenuBar = () => {

  const { user, clearSession } = useSession();
  const isStudent = user.user.id_privilegios === constants.privileges.user;
  const router = useRouter();

  const closeSession = () => {
    clearSession();
    Toast.show({
      title: "Sesión cerrada",
      status: "success",
      description: "Tu sesión ha sido cerrada correctamente",
      duration: 3000,
      isClosable: true,
    });
  }

  const _redirectToHome = () => {
    if (isStudent) {
      router.push('/screens/InitialMenu');
    } else {
      router.push('/screens/TeacherMenu');
    }
  }


  return (
    <Box w="90%" alignItems="center">
      <Menu bg={'gray.200'} w="190" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <Avatar
            size="md"
            source={
              profile_image
            }
            mt={4}
          />
        </Pressable>;
      }}>
        <Menu.Item onPress={_redirectToHome}> <Entypo name="home" size={14} color="black" /> Inicio</Menu.Item>
        <Menu.Item> <Feather name="settings" size={14} color="black" /> Configuración</Menu.Item>
        <Menu.Item onPress={closeSession}> <AntDesign name="logout" size={14} color="red" />Salir</Menu.Item>
      </Menu>
    </Box>
  );

}

export default MenuBar;
