import AsyncStorage from "@react-native-async-storage/async-storage";

const checkSession = async (router) => {
  try {
    const session = await AsyncStorage.getItem('session');
    if (session !== null) {
      consoole.log('Have session');
    }
    else {
      console.log('Session not found');
    }
  }
  catch (err) {
    console.log(err);
  }
}

export { checkSession };

