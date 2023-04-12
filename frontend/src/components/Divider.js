import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import stylesLogin from '../styles/LoginCss';

const Divider = () => {
  return (
    <View style={stylesLogin.divider}>
      <View style={stylesLogin.dividerLine} />
      <Text style={stylesLogin.dividerText}>ou</Text>
      <View style={stylesLogin.dividerLine} />
    </View>
  );
};
export default Divider;