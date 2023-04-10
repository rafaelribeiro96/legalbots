import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

const newUser = {
  email: 'rafaelfelipe.r@hotmail.com',
  password: 'senha123!'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userToken = await AsyncStorage.getItem("user_token");
        const usersStorage = await AsyncStorage.getItem("users_bd");

        if (userToken && usersStorage) {
          const hasUser = JSON.parse(usersStorage)?.filter(
            (user) => user.email === JSON.parse(userToken).email
          );

          if (hasUser) setUser(hasUser[0]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, []);


  const signIn = async (email, password, navigation) => {
    const usersStorage = JSON.parse(await AsyncStorage.getItem("users_bd")) || [];
    usersStorage.push(newUser);
    await AsyncStorage.setItem("users_bd", JSON.stringify(usersStorage));

    try {
      const usersStorage = JSON.parse(await AsyncStorage.getItem("users_bd"));

      const hasUser = usersStorage?.filter((user) => user.email === email);

      if (hasUser?.length) {
        if (hasUser[0].email === email && hasUser[0].password === password) {
          const token = Math.random().toString(36).substring(2);
          await AsyncStorage.setItem("user_token", JSON.stringify({ email, token }));
          setUser({ email, password });
          navigation.navigate('Home'); // adiciona a navegação aqui
          return { success: true };
        } else {
          return { success: false, error: "E-mail ou senha incorretos" };
        }
      } else {
        return { success: false, error: "Usuário não cadastrado" };
      }
    } catch (e) {
      console.log(e);
      return { success: false, error: "Falha ao fazer login" };
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
