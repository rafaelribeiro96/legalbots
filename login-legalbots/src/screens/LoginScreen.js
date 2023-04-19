// React imports
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormLogin from '../components/FormLogin';
import ForgotPasswordButton from '../components/ForgotPasswordButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LoginButton from '../components/LoginButton';
import Logo from '../components/Logo';
import Divider from '../components/Divider';
import TitleSubtitle from '../components/TitleSubtitle';
import { AuthContext } from '../context/AuthContext';
import stylesLogin from '../styles/LoginCss';
import color from '../styles/colors';
import { validateEmail, validatePassword } from '../utils/validators';
import { LinearGradient } from 'expo-linear-gradient';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('rafael.ribeiro@base2.com.br');
  const [password, setPassword] = useState('Senha123!');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= 1;
    setButtonEnabled(isValidEmail && isValidPassword);
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    validateEmail(email);
    validatePassword(password);
    try {
      const result = await signIn(email, password, navigation);
      if (!result.success) {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.'
      );
    }
  }, [email, password, signIn, navigation]);

  // const handleForgotPassword = async () => {
  //   console.log("Botão 'Esqueci minha senha' clicado");};
  
  const handleGoogleAcount = async () => {
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