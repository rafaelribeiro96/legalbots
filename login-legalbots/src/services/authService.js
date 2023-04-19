import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

const ERROR_MESSAGE_DEFAULT = 'Falha ao fazer login, tente novamente';
const ERROR_MESSAGE_AUTH_FAILED = 'E-mail ou senha incorretos';
const WAIT_TIME = 1;

const signIn = async (email, password) => {
  email = email.toLowerCase();
  try {
    const response = await api.post("/login", { email, password });
    const { email: userEmail, token: userToken, error } = response.data;
    if (userEmail && userToken) {
      await AsyncStorage.setItem('user_token', userToken);
      const user = { email: userEmail, token: userToken };
      return { success: true, user };
    }
    const errorMessage = error || ERROR_MESSAGE_DEFAULT;
    return { success: false, error: errorMessage };
  } catch (error) {
    const errorMessage = error.response?.status === 401
      ? ERROR_MESSAGE_AUTH_FAILED
      : ERROR_MESSAGE_DEFAULT;
    console.log(error);
    return { success: false, error: errorMessage };
  }
};

const signOut = async () => {
  try {
    await AsyncStorage.removeItem('user_token');
  } catch (error) {
    console.log(error);
  }
};

const signInToken = async (navigation) => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      const { data } = await api.get('/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.email) {
        navigation.navigate('Home');
      } else {
        setTimeout(() => {
          navigation.navigate('Login');
        }, WAIT_TIME);
      }
    } else {
      setTimeout(() => {
        navigation.navigate('Login');
      }, WAIT_TIME);
    }
  } catch (error) {
    console.log(error);
    navigation.navigate('Login');
  }
};


export { signIn, signOut, signInToken };
