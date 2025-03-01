import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text, VStack, Box, HStack } from 'native-base';
import { PieChart } from 'react-native-chart-kit';
import TitleSpan from '../../components/ui/TitleSpan';
import MenuBar from '../../components/ui/MenuBar';
import axios from 'axios';
import { useSession } from '../../context/SessionContext';

const TeacherDashboard = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSession();

  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        const response = await axios.get('https://api-ig-red.vercel.app/api/encuesta');
        if (response.status === 200) {
          const filtered = response.data.filter(encuesta => encuesta.id_clase === user.clase.id_clase);
          setEncuestas(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching encuestas:', error);
        setLoading(false);
      }
    };

    fetchEncuestas();
  }, []);

  const prepareChartData = () => {
    let data = Array(9).fill(0).map(() => Array(5).fill(0));

    encuestas.forEach(encuesta => {
      Object.keys(encuesta).forEach(key => {
        if (key.startsWith('pregunta_')) {
          let questionIndex = parseInt(key.split('_')[1]) - 1;
          let answer = parseInt(encuesta[key]);
          if (!isNaN(answer) && answer >= 1 && answer <= 5) {
            let answerIndex = answer - 1;
            data[questionIndex][answerIndex]++;
          }
        }
      });
    });

    return data.map(questionData => {
      const total = questionData.reduce((acc, curr) => acc + curr, 0);
      return questionData.map(count => (total ? (count / total * 100).toFixed(2) : 0));
    });
  };

  const renderPieChart = (data, index) => {
    // Convertir los datos numéricos a porcentajes con etiquetas adecuadas para la leyenda
    const pieChartData = data.map((value, idx) => ({
      name: `${idx + 1} (${value}%)`, // Añade el porcentaje en el nombre
      population: parseFloat(value),
      color: ['#ff5348', '#FFA500', '#ffff48', '#73e471', '#719be4'][idx], // Colores predefinidos
      legendFontColor: 'white',
      legendFontSize: 15
    }));



    return (
      <PieChart
        data={pieChartData}
        width={400}
        height={220}
        chartConfig={{
          backgroundColor: '#272c35',
          backgroundGradientFrom: '#272c35',
          backgroundGradientTo: '#272c35',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={{
          marginVertical: 8
        }}
      />
    );
  };

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
  ];


  const [optionSelected, setOptionSelected] = useState(1);


  return (
    <Box flex={1}>
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Box alignItems="center" mt={4}>
          <TitleSpan title={['REG', 'DES']} />
        </Box>
        <MenuBar />
      </HStack>

      <HStack justifyContent="center" alignItems="center" mt={4} space={2}>
        <TouchableOpacity onPress={() => setOptionSelected(1)}>
          <Box alignItems="center" bg={'gray.900'} px={4} py={2} borderRadius={6} borderColor={`${optionSelected === 1 ? 'green.800' : 'transparent'}`} borderWidth={'1'}>
            <Text fontSize="lg" bold textAlign="center" color='white'>
              Estadísticas de la clase
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOptionSelected(2)}>
          <Box alignItems="center" bg={'gray.900'} px={4} py={2} borderRadius={6} borderColor={`${optionSelected === 2 ? 'green.800' : 'transparent'}`} borderWidth={'1'}>
            <Text fontSize="lg" bold textAlign="center" color='white'>
              Comentarios
            </Text>
          </Box>
        </TouchableOpacity>

      </HStack>


      {optionSelected === 1 &&
        <ScrollView>
          <VStack space={4} mt={5} p={4}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              prepareChartData().map((item, index) => (
                <Box key={index} bg="gray.800" p={4} borderRadius={10} shadow={2}>
                  <Text fontSize="lg" bold textAlign="center" color='white'>
                    Pregunta {index + 1}
                  </Text>
                  <Text fontSize="md" textAlign="center" color='gray.400'>
                    {questions[index]}
                  </Text>
                  {renderPieChart(item, index)}
                </Box>
              ))
            )}
          </VStack>
        </ScrollView>
      }

      {optionSelected === 2 &&
        <ScrollView>
          <VStack space={4} mt={5} p={4}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              encuestas.map((encuesta, index) => (
                <Box key={index} bg="gray.800" p={4} borderRadius={10} shadow={2}>
                  <Text fontSize="lg" bold textAlign="center" color='white'>
                    Comentario anonimo ({new Date(encuesta.fecha).toLocaleDateString()})
                  </Text>
                  <Text fontSize="md" textAlign="center" color='gray.400'>
                    {encuesta.comentario}
                  </Text>
                </Box>
              ))
            )}
          </VStack>
        </ScrollView>
      }
    </Box>
  );
};

export default TeacherDashboard;
