import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Alert, Button, TouchableHighlight, Text } from 'react-native';
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
  const [email, setEmail] = useState('rafaelfelipe.r@hotmail.com');
  const [password, setPassword] = useState('senha123!');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= 1;
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
    if (password.length < 1) {
      setPasswordError('Você deve inserir uma senha');
    } else {
      setPasswordError('');
    }
  };


  const handleLogin = useCallback(() => {
    validateEmail(email);
    validatePassword(password);

    signIn(email, password, navigation).then((result) => {
      if (!result.success) {
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


        {/* Botão teste de cadastrar */}
        <TouchableHighlight
          style={{ backgroundColor: 'transparent' }}
          underlayColor="#ccc"
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: 'black', fontSize: 14 }}>cadastrar</Text>
        </TouchableHighlight>


      </View>

    </View>
  );
};

export default LoginScreen;