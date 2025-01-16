
import React from 'react';
import { Box, Button, FormControl, Input, VStack, Text, Link, IconButton, Alert, HStack, CloseIcon } from 'native-base';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import TitleSpan from '../ui/TitleSpan';

export default function Login() {
  const router = useRouter();

  const emptyUser = { username: '', password: '' };
  const [user, setUser] = React.useState(emptyUser);
  const [showAlert, setShowAlert] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = () => {
    if (user.username === 'admin' && user.password === 'admin') {
      router.replace('/screens/InitialMenu');
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Box bg="#0D0D0D" pt={12} px={4} h={'100vh'}>
      {showAlert && (
        <Alert w="100%" status="error" mb={4}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <Text fontSize="sm" color="white">
                Usuario o contraseña incorrectos.
              </Text>
              <IconButton
                icon={<CloseIcon size="xs" color="white" />}
                onPress={() => setShowAlert(false)}
              />
            </HStack>
          </VStack>
        </Alert>
      )}

      <Box alignItems="center" mb={8} mt={'30%'}>
        <TitleSpan title={['REG', 'DES']} />
      </Box>

      <VStack space={4} alignItems="center" px={8} mt={10} h="100%">
        <FormControl>
          <Input
            placeholder="olstertecn"
            bg="gray.800"
            color="white"
            borderRadius="10"
            fontSize={20}
            borderWidth="0"
            value={user.username}
            onChangeText={(text) => setUser({ ...user, username: text })}
            InputLeftElement={
              <Box ml="3">
                <Text color="gray.400">👤</Text>
              </Box>
            }
          />
        </FormControl>

        <FormControl>
          <Input
            placeholder="********"
            type={showPassword ? 'text' : 'password'}
            bg="gray.800"
            color="white"
            borderRadius="10"
            mt={6}
            fontSize={20}
            borderWidth="0"
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
            InputLeftElement={
              <Box ml="3">
                <Text color="gray.400">🔒</Text>
              </Box>
            }
            InputRightElement={
              <IconButton
                icon={
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="gray"
                  />
                }
                onPress={() => setShowPassword(!showPassword)}
                mr="3"
              />
            }
          />
        </FormControl>

        <Text
          fontSize="sm"
          color="gray.400"
          textAlign="right"
          w="100%"
          mt="1"
        >
          <Link _text={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', textAlign: 'right' }}>
            Olvidé mi <Text color={'#3A9E7F'}>contraseña</Text>
          </Link>
        </Text>
        <Button
          mt="5"
          bg="#3A9E7F"
          w="100%"
          borderRadius="10"
          _pressed={{ bg: '#317C68' }}
          onPress={handleLogin}
        >
          ENTRAR
        </Button>

        <Text
          fontSize="sm"
          color="gray.400"
          textAlign="center"
          mt="2"
        >
          <Link
            _text={{ color: '#185D47', fontWeight: 'bold' }}
            onPress={() => router.replace('/screens/Register')}
          >
            Registrarme
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

