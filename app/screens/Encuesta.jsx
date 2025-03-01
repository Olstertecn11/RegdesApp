
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Button, FormControl, Radio, TextArea, Text, VStack, HStack } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import MenuBar from '../../components/ui/MenuBar';
import axios from 'axios'; // Asegúrate de tener axios instalado para realizar las peticiones HTTP

const Encuesta = ({ navigation }) => {
  const [encuesta, setEncuesta] = useState({
    id_usuario: '', // Asumo que estos datos los tienes de algún contexto o almacenamiento local
    id_clase: '',
    fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    comentario: '',
    pregunta_1: '',
    pregunta_2: '',
    pregunta_3: '',
    pregunta_4: '',
    pregunta_5: '',
    pregunta_6: '',
    pregunta_7: '',
    pregunta_8: '',
    pregunta_9: ''
  });

  const handleChange = (name, value) => {
    setEncuesta(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://yourapi.com/encuesta/:id', encuesta);
      if (response.status === 200) {
        // Handle success
        console.log('Encuesta actualizada con éxito');
        navigation.goBack(); // O alguna otra acción de navegación
      }
    } catch (error) {
      console.error('Error al actualizar encuesta:', error);
      // Handle error
    }
  };

  const satisfaction_status = [
    { color: 'green.500', text: '1 - Muy Insatisfecho' },
    { color: 'green.200', text: '2 - Insatisfecho' },
    { color: 'yellow.500', text: '3 - Neutral' },
    { color: 'orange.500', text: '4 - Satisfecho' },
    { color: 'red.500', text: '5 - Muy Satisfecho' }
  ]

  const questions = [
    '¿La enseñanza fue clara y fácil de entender?',
    '¿El tema fue interesante y aplicable a la vida cristiana?',
    '¿Tuviste oportunidad de participar y compartir tus ideas?',
    '¿El maestro demostró conocimiento y preparación sobre el tema?',
    '¿El maestro hizo que la clase fuera interactiva y amena?',
    '¿Te sentiste bien recibido y en confianza con los demás estudiantes?',
    '¿La clase te motivó a seguir estudiando la Biblia y asistiendo cada sábado?',
    '¿El tiempo de la clase fue suficiente para cubrir el tema?',
    '¿La clase te ayudó a crecer espiritualmente y fortalecer tu fe?'
  ]

  return (
    <ScrollView>
      <Box flex={1} p={4} w="100%" mx="auto" bg="#0D0D0D">
        <HStack justifyContent="space-between" alignItems="center" px={4}>
          <Box alignItems="center" mt={4}>
            <TitleSpan title={['REG', 'DES']} />
          </Box>
          <MenuBar />
        </HStack>
        <Box flex={1} p={4} w="100%" bg="gray.800" borderRadius={10} mt={10}>
          <Text color="white" fontSize="md" textAlign="center">Por favor, califica los siguientes aspectos de la clase en una escala del 1 al 5,
            donde:
          </Text>
          <Box bg='gray.900' p={4} mt={4} borderRadius={6}>
            <VStack space={2} mt={2}>
              {satisfaction_status.map((status, index) => (
                <HStack space={2}>
                  <Box w={5} h={5} bg={status.color} borderRadius='full' key={index} />
                  <Text color="white">{status.text}</Text>
                </HStack>
              ))
              }
            </VStack>
          </Box>
        </Box>
        <VStack space={4} mt={5}>
          {Array.from({ length: 9 }, (_, i) => (
            <FormControl key={i}>
              <FormControl.Label _text={{ color: 'white' }} flexWrap={'wrap'}>Pregunta {i + 1} {questions[i]}</FormControl.Label>
              <Radio.Group
                name={`pregunta_${i + 1}`}
                accessibilityLabel={`pregunta_${i + 1}`}
                onChange={value => handleChange(`pregunta_${i + 1}`, value)}
                value={encuesta[`pregunta_${i + 1}`]}
                colorScheme="emerald"
              >
                <HStack space={4}>
                  {Array.from({ length: 5 }, (_, j) => (
                    <Radio value={`${j + 1}`} my={1} _text={{ color: 'white' }} key={j}>
                      {j + 1}
                    </Radio>
                  ))}
                </HStack>
              </Radio.Group>
            </FormControl>
          ))}

          <FormControl>
            <FormControl.Label _text={{ color: 'white' }}>Comentarios Adicionales</FormControl.Label>
            <TextArea
              h={20}
              placeholder="Ingresa tus comentarios aquí..."
              backgroundColor="white"
              onChangeText={value => handleChange('comentario', value)}
            />
          </FormControl>
          <Button mt={5} colorScheme="emerald" onPress={handleSubmit}>
            Enviar Encuesta
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default Encuesta;
