
import React from 'react';
import { Box, Button, FormControl, Input, VStack, Text, Link, Center } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import { useRouter } from 'expo-router';

export default function Register() {


  const router = useRouter();
  return (
    <Box bg="#0D0D0D" paddingTop={'40%'} px={4} flex={1} >
      <Box alignItems="center" mb={8}>
        <TitleSpan title={['REG', 'DES']} />
      </Box>

      <VStack space={4} alignItems="center" px={6} mt={20}>
        <FormControl>
          <Input
            placeholder="olstertecn"
            bg="gray.800"
            color="white"
            borderRadius="10"
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
            placeholder="********"
            type="password"
            bg="gray.800"
            color="white"
            marginTop="2"
            borderRadius="10"
            fontSize={20}
            borderWidth="0"
            InputLeftElement={
              <Box ml="3">
                <Text color="gray.400">🔒</Text>
              </Box>
            }
          />
        </FormControl>

        <FormControl>
          <Input
            placeholder="54JFDA"
            bg="gray.800"
            color="white"
            borderRadius="10"
            fontSize={20}
            marginTop="2"
            borderWidth="0"
            InputLeftElement={
              <Box ml="3">
                <Text color="gray.400">🔑</Text>
              </Box>
            }
          />
        </FormControl>

        <Button
          mt="5"
          bg="#3A9E7F"
          borderRadius="10"
          fontSize={20}
          w='100%'
          _pressed={{ bg: '#317C68' }}
        >
          REGISTRARME
        </Button>

        <Text
          fontSize="sm"
          color="gray.400"
          textAlign="center"
          mt="3"
        >
          <Link _text={{ color: '#3A9E7F', fontWeight: 'bold' }} onPress={() => router.replace('/')}>
            Volver al login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

