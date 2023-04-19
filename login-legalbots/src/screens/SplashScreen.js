import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import logoRobo from "../../assets/logoRobo.png";
import { signInToken } from '../services/authService';
import SplashScreenCss from "../styles/SplashScreenCss";

const SignInToken = () => {
  const navigation = useNavigation();

  useEffect(() => {
    signInToken(navigation);
  }, []);

  return (
    <View style={SplashScreenCss.container}>
      <Image source={logoRobo} style={SplashScreenCss.logo} />
    </View>
  );
};

export default SignInToken;
