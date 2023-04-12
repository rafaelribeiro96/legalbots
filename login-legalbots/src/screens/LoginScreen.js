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
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import color from '../styles/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('rafaelfelipe.r@hotmail.com');
  const [password, setPassword] = useState('Senha123!');
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
  
    signIn(email, password, navigation)
      .then((result) => {
        if (!result.success) {
          Alert.alert('Erro', result.error);
        }
      })
      .catch((error) => {
        console.log('Erro ao fazer login:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
      });
  }, [email, password, signIn, navigation]);
  

  const handleForgotPassword = () => {
    console.log("Botão 'Esqueci minha senha' clicado");
  };

  const handleGoogleAcount = () => {
    console.log("Botão Login Google clicado");
  };

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}>
    <LinearGradient
      colors={color.background}
      style={stylesLogin.container}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 0.9, y: 0.8 }}
    >

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
          onPress={() => navigation.navigate('Register')}
        />

        <LoginButton
          onPress={handleLogin}
          buttonEnabled={buttonEnabled}
        />

        <Divider text="Ou" />

        <GoogleLoginButton
          onPress={handleGoogleAcount}
        />

      </View>

    </LinearGradient>

    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;