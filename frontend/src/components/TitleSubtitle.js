import React from 'react';
import { View, Text } from 'react-native';
import stylesLogin from '../styles/LoginCss';

const TitleSubtitle = ({ title, subtitle }) => {
  return (
    <View style={stylesLogin.titles}>
      <Text style={stylesLogin.greeting}>{title}</Text>
      <Text style={stylesLogin.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default TitleSubtitle;