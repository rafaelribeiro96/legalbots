import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, Image } from "react-native";
import logoRobo from "../../assets/logoRobo.png";

import api from "../utils/api";

const SignInToken = () => {
  const navigation = useNavigation();
  const timeOut = 1000;

  useEffect(() => {
    const singInToken = async () => {
      const token = await AsyncStorage.getItem("user_token");
      if (token) {
        try {
          const data = await api.get("/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigation.navigate("Home");
        } catch (e) {
          navigation.navigate("Login");
        }
      } else {
        setTimeout(() => {
          navigation.navigate("Login");
        }, timeOut);
      }
    };

    setTimeout(() => {
      singInToken();
    }, timeOut);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logoRobo} style={styles.logo} />
      <ActivityIndicator color="black" size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#484150",
  },
  logo: {
    width: 100,
    height: 100,
  }
});

export default SignInToken;
