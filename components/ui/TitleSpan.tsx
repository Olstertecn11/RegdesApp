import React from 'react';
import { HStack, Text } from 'native-base';

const TitleSpan = ({ title }) => {
  return (
    <HStack justifyContent='center' pt={0}>
      <Text fontSize="5xl" fontWeight="bold" color="white">
        {title[0]}
      </Text>
      <Text fontSize="5xl" fontWeight="bold" color="#3A9E7F">
        {title[1]}
      </Text>
    </HStack>
  );
}

export default TitleSpan;
