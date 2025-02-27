import { Box, Text } from "native-base";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSession } from "../../context/SessionContext";
import { get_student_assistence } from "../../services/assistence";




const AssistenceStudent = () => {


  const isFocused = useIsFocused();
  const { user } = useSession();

  const fetch_assistence = async () => {
    console.log('fetching');
    console.log(user);
    const response = await get_student_assistence(user.clase.id_clase);
    console.log('response');
    console.log(response);

  };


  React.useEffect(() => {
    if (isFocused) {
      fetch_assistence();
    }

  }, [isFocused]);





  return (
    <Box>
      <Text color='white'>AssitenceStudent</Text>
    </Box>

  );

};

export default AssistenceStudent;




