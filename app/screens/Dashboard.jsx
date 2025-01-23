import { Box, Avatar, HStack, Text } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const Dashboard = () => {
  const router = useRouter();

  const redirect = (route) => {
    router.replace(route);
  };

  return (
    <Box bg="#0D0D0D" pt={12} px={4} h="100vh">
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <Avatar
          size="lg"
          source={{ uri: 'https://via.placeholder.com/150' }}
          mt={4}
        />
      </HStack>

      <Box h="100%" w="100%" mt={10}>
        <HStack space={6} px={8} p={4} height="20%" w="100%">
          <TouchableOpacity onPress={() => redirect('/screens/Lessons')} activeOpacity={0.8}>
            <Box w="100%" bg="#212121" h="100%" borderRadius={20} pl="14%" pt="6%">
              <FontAwesome name="book" size={90} color="white" />
              <Text color="white" fontWeight="bold" mt={2}>
                Lecciones
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('/screens/Attendance')} activeOpacity={0.8}>
            <Box w="100%" bg="#212121" h="100%" borderRadius={20} pl="14%" pt="6%">
              <FontAwesome name="calendar-minus-o" size={90} color="white" />
              <Text color="white" fontWeight="bold" mt={2}>
                Asistencia
              </Text>
            </Box>
          </TouchableOpacity>
        </HStack>
        <HStack space={6} px={8} p={4} height="20%" w="100%">
          <TouchableOpacity onPress={() => redirect('/screens/Tests')} activeOpacity={0.8}>
            <Box w="100%" bg="#212121" h="100%" borderRadius={20} pl="14%" pt="6%">
              <MaterialCommunityIcons name="ab-testing" size={90} color="white" />
              <Text color="white" fontWeight="bold" mt={2}>
                Pruebas
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('/screens/Settings')} activeOpacity={0.8}>
            <Box w="100%" bg="#212121" h="100%" borderRadius={20} pl="14%" pt="6%">
              <Ionicons name="settings" size={90} color="white" />
              <Text color="white" fontWeight="bold" mt={2}>
                Configuración
              </Text>
            </Box>
          </TouchableOpacity>
        </HStack>
      </Box>
    </Box>
  );
};

export default Dashboard;

