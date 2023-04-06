import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import stylesLogin from '../styles/LoginCss';

const ForgotPasswordButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={stylesLogin.forgotPasswordButton}
      onPress={onPress}
    >
      <Text style={stylesLogin.forgotPasswordText}>Esqueci minha senha</Text>
    </TouchableOpacity>
  );
};

export default ForgotPasswordButton;