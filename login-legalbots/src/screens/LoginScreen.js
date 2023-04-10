// LoginScreen.js

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import stylesLogin from '../styles/LoginCss';
import FormLogin from '../components/FormLogin';
import ForgotPasswordButton from '../components/ForgotPasswordButton';
import LoginButton from '../components/LoginButton';
import Divider from '../components/Divider';
import GoogleLoginButton from '../components/GoogleLoginButton';
import TitleSubtitle from '../components/TitleSubtitle';
import Logo from '../components/Logo';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setButtonEnabled(isValidEmail && isValidPassword);
  }, [email, password]);

  const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, insira um email válido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('A senha deve conter pelo menos 8 caracteres e um caractere especial');
    } else {
      setPasswordError('');
    }
  };


  const handleLogin = useCallback(() => {
    validateEmail(email);
    validatePassword(password);
  
     // Chama a função signIn, passando o email, senha e objeto navigation para autenticação
    signIn(email, password, navigation).then((result) => {
      if (!result.success) {
                // Exibe uma mensagem de erro caso as credenciais sejam inválidas
        Alert.alert('Erro', result.error);
      }
    });
  }, [email, password, signIn, navigation]);

  const handleForgotPassword = () => {
    console.log("Botão 'Esqueci minha senha' clicado");
  };

  const handleGoogleAcount = () => {
    console.log("Botão Login Google clicado");
  };

  return (
    <View style={stylesLogin.container}>
      <Logo />

      <TitleSubtitle title="Olá Novamente!" subtitle="Lorem ipsum dolor sit amet" />

      <View style={stylesLogin.formContainer}>
        <FormLogin
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
          buttonEnabled={buttonEnabled}
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
        />

        <ForgotPasswordButton
          onPress={handleForgotPassword}        
        />

        <LoginButton
          onPress={handleLogin}
          buttonEnabled={buttonEnabled}
        />

        <Divider text="Ou" />

        <GoogleLoginButton
          onPress={handleGoogleAcount}        
        />

        <Text style={stylesLogin.footerText}>Não tem uma conta? Cadastre-se</Text>

      </View>

    </View>
  );
};

export default LoginScreen;