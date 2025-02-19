import { Box, Avatar, HStack, Text, VStack } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import MenuBar from '../../components/ui/MenuBar';

const Dashboard = () => {
  const router = useRouter();

  const redirect = (route) => {
    router.replace(route);
  };

  return (
    <Box bg="#0D0D0D" pt={12} px={4} flex={1}>
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>

      <VStack space={6} alignItems="center" w="100%" mt={'30%'}>
        {/* Fila 1 */}
        <HStack space={6} justifyContent="center">
          <TouchableOpacity onPress={() => redirect('/screens/Lessons')} activeOpacity={0.8}>
            <Box w={40} h={40} bg="#212121" borderRadius={15} alignItems="center" justifyContent="center">
              <FontAwesome name="book" size={70} color="white" />
              <Text color="white" fontWeight="bold" mt={3} fontSize="md">
                Lecciones
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => redirect('/screens/Attendance')} activeOpacity={0.8}>
            <Box w={40} h={40} bg="#212121" borderRadius={15} alignItems="center" justifyContent="center">
              <FontAwesome name="calendar-minus-o" size={70} color="white" />
              <Text color="white" fontWeight="bold" mt={3} fontSize="md">
                Asistencia
              </Text>
            </Box>
          </TouchableOpacity>
        </HStack>

        {/* Fila 2 */}
        <HStack space={6} justifyContent="center">
          <TouchableOpacity onPress={() => redirect('/screens/Tests')} activeOpacity={0.8}>
            <Box w={40} h={40} bg="#212121" borderRadius={15} alignItems="center" justifyContent="center">
              <MaterialCommunityIcons name="ab-testing" size={70} color="white" />
              <Text color="white" fontWeight="bold" mt={3} fontSize="md">
                Pruebas
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => redirect('/screens/Settings')} activeOpacity={0.8}>
            <Box w={40} h={40} bg="#212121" borderRadius={15} alignItems="center" justifyContent="center">
              <Ionicons name="settings" size={70} color="white" />
              <Text color="white" fontWeight="bold" mt={3} fontSize="md">
                Configuración
              </Text>
            </Box>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Dashboard;
