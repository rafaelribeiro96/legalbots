import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  
  const signIn = async (email, password, navigation) => {
    try {
      const response = await api.post("/login", { email, password });
      const { email: userEmail, token: userToken } = response.data;
  
      if (userEmail && userToken) {
        await AsyncStorage.setItem("user_token", userToken);
        const user = { email: userEmail, token: userToken };
        setUser(user);
        navigation.navigate('Home');
        return { success: true };
      } else {
        return { success: false, error: "E-mail ou senha incorretos" };
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 401) {
        return { success: false, error: "E-mail ou senha incorretos" };
      } else {
        return { success: false, error: "Falha ao fazer login" };
      }
    }
  };
  
  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user_token");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
    value={{ user, signed: !!user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
  
};
