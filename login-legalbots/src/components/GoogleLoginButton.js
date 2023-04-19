import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import stylesLogin from '../styles/LoginCss';

const GoogleLoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={stylesLogin.googleLoginButton} onPress={onPress}>
        <Image source={require('../../assets/logoGoogle.png')} style={stylesLogin.logoGoogle} />
      <Text style={stylesLogin.googleLoginText}>
        Fazer login com o Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;