import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export const AuthContext = createContext({});



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const fetchUser = async (token) => {
    try {
      const response = await api.get("/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const hasUser = response.data.find((user) => user.email === token);
      if (hasUser) setUser(hasUser);
    } catch (e) {
      console.log(`error fetchUser: ${e}`);
    }
  };
  
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = await AsyncStorage.getItem("user_token");
  //     if (token) {
  //       try {
  //         console.log(`Bearer ${token}`);
          
  //         const response = await api.get("/", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         console.log("response:", response);
  //         console.log("response.data:", response.data);
  //         const hasUser = response.data.find((user) => user.email === token);
  //         console.log("hasUser:", hasUser);
  //         if (hasUser) {
  //           setUser(hasUser);
  //         } else {
  //           await AsyncStorage.removeItem("user_token");
  //         }
  //       } catch (e) {
  //         console.log(`error checkout: ${e}`);
  //         await AsyncStorage.removeItem("user_token");
  //       }
  //     }
  //   };
    
  //   checkAuth();
  // }, []);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = await AsyncStorage.getItem("user_token");
  //     if (token) {
  //       try {
  //         console.log(`Bearer ${token}`);
          
  //         const response = await api.get("/", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         console.log("response:", response);
  //         console.log("response.data:", response.data);
  //         const hasUser = response.data.find((user) => user.email === token);
  //         console.log("hasUser:", hasUser);
  //         if (hasUser) {
  //           setUser(hasUser);
  //         } else {
  //           await AsyncStorage.removeItem("user_token");
  //         }
  //       } catch (e) {
  //         console.log(`error checkout: ${e}`);
  //         await AsyncStorage.removeItem("user_token");
  //       }
  //     }
  //   };
    
  //   checkAuth();
  // }, []);
  
  const signIn = async (email, password, navigation) => {
    try {
      const response = await api.post("/login", { email, password });
      const { email: userEmail, token: userToken } = response.data;
  
      if (userEmail && userToken) {
        await AsyncStorage.setItem("user_token", userToken);
        console.log(`salvando token no asyncStorage: ${userToken}`);
        const user = { email: userEmail, token: userToken };
        setUser(user);
        navigation.navigate('Home');
        console.log("finalizando login com sucesso");
        return { success: true };
      } else {
        console.log("finalizando login com erro E-mail ou senha incorretos");
        return { success: false, error: "E-mail ou senha incorretos" };
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 401) {
        console.log("finalizando login com erro Email ou senha incorretos");
        return { success: false, error: "E-mail ou senha incorretos" };
      } else {
        console.log("finalizando login com erro Falha ao fazer login");
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
    value={{ user, signed: !!user, signIn, signOut, fetchUser: (token) => fetchUser(token) }}
    >
      {children}
    </AuthContext.Provider>
  );
  
};
