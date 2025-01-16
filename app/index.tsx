import { View, Text } from "native-base";
import Login from "@/components/views/Login";
import { useEffect } from "react";
import { checkSession } from '@/scripts/check-session';
import { useRouter } from "expo-router";


const InitialScreen = () => {

  const router = useRouter();


  useEffect(() => {
    checkSession(router);
  }, []);
  return <Login />;
}

export default InitialScreen;
