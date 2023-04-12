import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import stylesLogin from '../styles/LoginCss';

const FormLogin = ({
  email,
  password,
  setEmail,
  setPassword,
  isPasswordVisible,
  setIsPasswordVisible,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const onFocusInput = () => {
    setIsFocused(true);
  };

  const onBlurInput = () => {
    setIsFocused(false);
  };

  const onFocusInputPassword = () => {
    setIsFocusedPassword(true);
  };

  const onBlurInputPassword = () => {
    setIsFocusedPassword(false);
  };

  return (
    <>
      <Text style={stylesLogin.inputLabel}>Email</Text>
      <TextInput
        style={[stylesLogin.input, { borderColor: isFocused ? stylesLogin.colors.secundaria : stylesLogin.colors.borda }]}
        placeholder="Insira seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onFocus={onFocusInput}
        onBlur={onBlurInput}
      />

      <Text style={stylesLogin.inputLabel}>Senha</Text>
      <View style={[stylesLogin.passwordInputContainer, stylesLogin.input, { borderColor: isFocusedPassword ? stylesLogin.colors.secundaria : stylesLogin.colors.branco }]}>
        <TextInput
          style={[stylesLogin.passwordInput]}
          placeholder="Insira sua senha"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={onFocusInputPassword}
          onBlur={onBlurInputPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={stylesLogin.passwordVisibilityButton}
        >
          <MaterialIcons
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default FormLogin;