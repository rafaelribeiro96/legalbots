import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../utils/api';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('teste');
  const [email, setEmail] = useState('teste@teste.com');
  const [confirmEmail, setConfirmEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('Senha123!');
  const [confirmPassword, setConfirmPassword] = useState('Senha123!');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleRegister = async () => {
    const lowercaseEmail = email.toLowerCase();

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres');
      return;
    }
    if (!password.match(/[a-z]/)) {
      setErrorMessage('A senha deve conter pelo menos uma letra minúscula');
      return;
    }
    if (!password.match(/[A-Z]/)) {
      setErrorMessage('A senha deve conter pelo menos uma letra maiúscula');
      return;
    }
    if (!password.match(/[0-9]/)) {
      setErrorMessage('A senha deve conter pelo menos um número');
      return;
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      setErrorMessage('A senha deve conter pelo menos um caracter especial');
      return;
    }

    if (lowercaseEmail !== confirmEmail.toLowerCase()) {
      setErrorMessage('Os endereços de email não coincidem');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lowercaseEmail)) {
      setErrorMessage('Endereço de email inválido');
      return;
    }

    try {
      await api.post('/register', { name, email, password });
      navigation.navigate('Login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Usuário já existe');
      } else {
        setErrorMessage('Ocorreu um erro ao criar sua conta');
      }
    }
  };


  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>

      <Text style={styles.titlePage}>Cadastro de Usuário</Text>

      {errorMessage ?
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
        : null}

      <TextInput
        style={styles.textInput}
        onChangeText={setName}
        value={name}
        placeholder="Nome"
      />

      <TextInput
        style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        placeholder="E-mail"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.textInput}
        onChangeText={setConfirmEmail}
        value={confirmEmail}
        placeholder="Confirme seu e-mail"
        keyboardType="email-address"
      />

      <View style={styles.textInput}>
        <TextInput
          placeholder="Insira sua senha"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          style={styles.textPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <MaterialIcons
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textInput}>
        <TextInput
          placeholder="Confirme sua senha"
          secureTextEntry={!isConfirmPasswordVisible}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          style={styles.textPassword}
        />
        <TouchableOpacity
          onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
        >
          <MaterialIcons
            name={isConfirmPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}>
        <Text style={styles.buttonText}>Já tenho uma conta</Text>
      </TouchableOpacity>

    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titlePage: {
    fontSize: 24,
    marginBottom: 24,
    fontFamily: fonts.font_600,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 12
  },
  textInput: {
    width: '80%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    fontFamily: fonts.font_400,
    backgroundColor: colors.backgroundInput,
    borderColor: colors.primaria,
  },
  textPassword: {
    flex: 1,
    fontFamily: fonts.font_400,
  },
  button: {
    backgroundColor: colors.primaria,
    padding: 12,
    width: '80%',
    margin: 10,
    borderRadius: 10,
    marginTop: 24,
  },
  buttonText: {
    color: colors.bordaInput,
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: fonts.font_500,
  }
});

export default RegisterScreen;