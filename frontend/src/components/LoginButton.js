import React from 'react';
import { TouchableOpacity, Text, Button } from 'react-native';
import stylesLogin from '../styles/LoginCss';
import { LinearGradient } from 'expo-linear-gradient';

const LoginButton = ({ onPress, buttonEnabled }) => {
  return (
    <LinearGradient
    colors={buttonEnabled ? ['#8360C3', '#2EBF91'] : ['grey', 'grey']}
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
