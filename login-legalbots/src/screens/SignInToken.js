import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import api from "../utils/api";

const SignInToken = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const singInToken = async () => {
      const token = await AsyncStorage.getItem("user_token");
      console.log("token:", token);
      if (token) {
        try {
          console.log(`Bearer ${token}`);
          const data = await api.get("/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigation.navigate("Home");
        } catch (e) {
          navigation.navigate("Login");
          console.log(e);
        }
      } else {
        navigation.navigate("Login");
      }
    };

    singInToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="black" size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignInToken;