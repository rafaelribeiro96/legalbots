import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import stylesLogin from '../styles/LoginCss';

const LoginButton = ({ onPress, buttonEnabled }) => {
  return (
    <TouchableOpacity
      style={[stylesLogin.button, buttonEnabled ? stylesLogin.buttonEnabled : stylesLogin.buttonDisabled]}
      onPress={onPress}
      disabled={!buttonEnabled}
    >
      <Text style={stylesLogin.buttonText}>Entrar</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
