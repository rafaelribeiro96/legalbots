import React from 'react';
import { Image } from 'react-native';
import stylesLogin from '../styles/LoginCss';

const Logo = () => {
  return (
    <Image source={require('../../assets/logo.png')} style={stylesLogin.logo} />
  );
};

export default Logo;
