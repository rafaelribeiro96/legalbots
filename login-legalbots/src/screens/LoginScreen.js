import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import stylesLogin from '../styles/LoginCss';
import FormLogin from '../components/FormLogin';
import ForgotPasswordButton from '../components/ForgotPasswordButton';
import LoginButton from '../components/LoginButton';
import Divider from '../components/Divider';
import GoogleLoginButton from '../components/GoogleLoginButton';
import TitleSubtitle from '../components/TitleSubtitle';
import Logo from '../components/Logo';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
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

  const handleLogin = () => {
    validateEmail(email);
    validatePassword(password);
    // TODO: enviar solicitação ao servidor para verificar as credenciais de login
    // se as credenciais forem válidas, navegue para a tela inicial do aplicativo
    navigation.navigate('Home');
  };

  return (
    <View style={stylesLogin.container} >

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

        <ForgotPasswordButton onPress={() => console.log('Esqueci minha senha')} />

        <LoginButton onPress={handleLogin} buttonEnabled={buttonEnabled} />

        <Divider />

        <GoogleLoginButton onPress={() => console.log('Login com o Google')} />
      </View>
      
    </View>
  );
};

export default LoginScreen;