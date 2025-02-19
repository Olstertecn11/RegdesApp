import React, { useState } from 'react';
import { Box, Button, FormControl, Input, VStack, Text, Link, Icon, Pressable } from 'native-base';
import { useRouter } from 'expo-router';
import { register } from '../../services/user';
import { Toast } from 'native-base';
import { Eye, EyeOff } from 'lucide-react-native';
import TitleSpan from '../../components/ui/TitleSpan';

export default function Register() {
  const router = useRouter();

  const empty_user = { username: '', password: '', confirmed_password: '' };
  const [user, setUser] = useState(empty_user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const register_user = async () => {
    console.log('registering user');
    if (user.password !== user.confirmed_password) {
      Toast.show({
        title: 'Las contraseñas no coinciden',
        status: 'error',
        duration: 3000,
        placement: 'top',
      });
      return;
    }

    const response = await register({ usuario: user.username, contrasena: user.password, correo: 'fasdf' });
    if (response.status === 201) {
      Toast.show({
        title: 'Usuario registrado exitosamente',
        status: 'success',
        duration: 3000,
        placement: 'top',
      });
      setTimeout(() => {
        router.replace('/');
      }, 1000);
      return;
    }
    Toast.show({
      title: 'Error al registrar usuario',
      status: 'error',
      duration: 3000,
      placement: 'top',
    });
  };

  return (
    <Box bg="#0D0D0D" paddingTop={'40%'} px={4} flex={1}>
      <Box alignItems="center" mb={8}>
        <TitleSpan title={['REG', 'DES']} />
      </Box>

      <VStack space={4} alignItems="center" px={6} mt={20}>
        <FormControl>
          <Input
            placeholder="Usuario"
            bg="gray.800"
            color="white"
            borderRadius="10"
            onChangeText={(text) => handleChange('username', text)}
            fontSize={20}
            borderWidth="0"
            InputLeftElement={
              <Box ml="3">
                <Text color="gray.400">👤</Text>
              </Box>
            }
          />
        </FormControl>

        <FormControl>
          <Input
            placeholder="Contraseña"
            type={showPassword ? 'text' : 'password'}
            bg="gray.800"
            color="white"
            marginTop="2"
            borderRadius="10"
            fontSize={20}
            onChangeText={(text) => handleChange('password', text)}
            borderWidth="0"
            InputLeftElement={
              <Box ml="3">
                <Text color="gray.400">🔑</Text>
              </Box>
            }
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)} mr="3">
                <Icon as={showPassword ? EyeOff : Eye} color="gray.400" size={5} />
              </Pressable>
            }
          />
        </FormControl>

        <FormControl>
          <Input
            placeholder="Confirmar contraseña"
            type={showConfirmedPassword ? 'text' : 'password'}
            bg="gray.800"
            color="white"
            borderRadius="10"
            onChangeText={(text) => handleChange('confirmed_password', text)}
            fontSize={20}
            marginTop="2"
            borderWidth="0"
            InputLeftElement={
              <Box ml="3">
                <Text color="gray.400">🔑</Text>
              </Box>
            }
            InputRightElement={
              <Pressable onPress={() => setShowConfirmedPassword(!showConfirmedPassword)} mr="3">
                <Icon as={showConfirmedPassword ? EyeOff : Eye} color="gray.400" size={5} />
              </Pressable>
            }
          />
        </FormControl>

        <Button
          mt="5"
          bg="#3A9E7F"
          borderRadius="10"
          fontSize={20}
          w="100%"
          _pressed={{ bg: '#317C68' }}
          onPress={register_user}
        >
          REGISTRARME
        </Button>

        <Text fontSize="sm" color="gray.400" textAlign="center" mt="3">
          <Link _text={{ color: '#3A9E7F', fontWeight: 'bold' }} onPress={() => router.replace('/')}>
            Volver al login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
