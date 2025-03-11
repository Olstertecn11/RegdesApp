import React, { useState } from 'react';
import { Input, Text, Box, Button, VStack, HStack, ScrollView } from 'native-base';
import TitleSpan from '../../components/ui/TitleSpan';
import MenuBar from '../../components/ui/MenuBar';
import axios from 'axios';
import { useSession } from '../../context/SessionContext';

export default function Informe() {

  const { user } = useSession();
  const url = 'https://api-ig-red.vercel.app/api/'
  const [formData, setFormData] = useState({
    comentario: '',
    visitas: '',
    contactos: '',
    estudiosBiblicos: '',
    miembrosRescate: '',
    miembrosInvolucrados: '',
    oracionIntercesora: '',
    bautismos: '',
    involucradosBenevolencia: '',
    estudiaron: '',
    numeroVisitas: ''
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const current_date = new Date().toISOString().split('T')[0];


    console.log('before');
    const informeResponse = await axios.post(`${url}informes`, {
      fecha: current_date,
      titulo: 'Informe Semanal',
      comentario: formData.comentario,
      id_profesor: user.user.id,
      id_clase: user.clase.id_clase
    });


    console.log('informe');
    console.log(informeResponse);
    if (informeResponse.status === 201) {
      console.log('Informe submitted successfully');
    }
    else {
      console.log('Error submitting informe');
    }
    // if (informeResponse.data) {
    //   await axios.post(`${url}acciones-misioneras`, {
    //     id_informe: informeResponse.data.id_informe,
    //     ...formData
    //   });
    //   console.log('Both informe and acciones misioneras submitted successfully');
    // }
  };

  return (
    <Box safeArea flex={1} bg="#0D0D0D">
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>
      <ScrollView>
        <VStack space={4} p={4}>
          <Text color="gray.400" fontSize="sm" textAlign="center">
            Informe del 24/04/2025
          </Text>

          <Field label="Comentario" value={formData.comentario} onChange={handleChange} fieldName="comentario" full />
          <HStack space={3}>
            <Field label="Visitas" value={formData.visitas} onChange={handleChange} fieldName="visitas" />
            <Field label="Contactos" value={formData.contactos} onChange={handleChange} fieldName="contactos" />
          </HStack>
          <HStack space={3}>
            <Field label="Estudios bíblicos" value={formData.estudiosBiblicos} onChange={handleChange} fieldName="estudiosBiblicos" />
            <Field label="Miembros rescate" value={formData.miembrosRescate} onChange={handleChange} fieldName="miembrosRescate" />
          </HStack>
          <HStack space={3}>
            <Field label="Miembros involucrados" value={formData.miembrosInvolucrados} onChange={handleChange} fieldName="miembrosInvolucrados" />
            <Field label="Oración intercesora" value={formData.oracionIntercesora} onChange={handleChange} fieldName="oracionIntercesora" />
          </HStack>
          <HStack space={3}>
            <Field label="Bautismos" value={formData.bautismos} onChange={handleChange} fieldName="bautismos" />
            <Field label="Involucrados benevolencia" value={formData.involucradosBenevolencia} onChange={handleChange} fieldName="involucradosBenevolencia" />
          </HStack>
          <HStack space={3}>
            <Field label="Estudiaron" value={formData.estudiaron} onChange={handleChange} fieldName="estudiaron" />
            <Field label="Número de visitas" value={formData.numeroVisitas} onChange={handleChange} fieldName="numeroVisitas" />
          </HStack>

          <Button mt={5} colorScheme="teal" onPress={handleSubmit}>
            ENVIAR INFORME
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}

const Field = ({ label, value, onChange, fieldName, full = false }) => (
  <VStack width={full ? '100%' : "48%"} space={2}>
    <Text color="white" fontSize="sm">{label}</Text>
    <Input bg="gray.700" placeholder="Ingrese aquí" borderWidth={0} borderRadius='sm' color={'white'}
      value={value} onChangeText={(val) => onChange(fieldName, val)} />
  </VStack>
);
