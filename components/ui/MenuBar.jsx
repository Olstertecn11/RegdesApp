import { Avatar, Text, Box, Menu, Pressable } from "native-base";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession } from "../../context/SessionContext";
import { Toast } from "native-base";

const MenuBar = () => {

  const { clearSession } = useSession();

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


  return (
    <Box w="90%" alignItems="center">
      <Menu w="190" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <Avatar
            size="md"
            src={
              'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
            mt={4}
          />
        </Pressable>;
      }}>
        <Menu.Item>SF Pro</Menu.Item>
        <Menu.Item>Helvetica</Menu.Item>
        <Menu.Item onPress={closeSession}>Salir <AntDesign name="logout" size={14} color="red" /></Menu.Item>
      </Menu>
    </Box>
  );

}

export default MenuBar;
