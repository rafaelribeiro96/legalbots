import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import stylesLogin from '../styles/LoginCss';
import { LinearGradient } from 'expo-linear-gradient';
import color from '../styles/colors';

const LoginButton = ({ onPress, buttonEnabled }) => {
  return (
    <LinearGradient
    colors={buttonEnabled ? color.backgroundButtonLogin : ['grey', 'grey']}
    style={stylesLogin.button}
    start={{ x: 0.1, y: 0.2 }}
    end={{ x: 0.9, y: 0.8 }}
    >
    <TouchableOpacity onPress={onPress} disabled={!buttonEnabled}>
      <Text style={stylesLogin.buttonText}>Entrar</Text>
    </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginButton;
