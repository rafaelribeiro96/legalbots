import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../utils/api';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      await api.post('/criar', { name, email: lowercaseEmail, password });
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      setErrorMessage('Ocorreu um erro ao criar sua conta');
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

      <View style={styles.passwordInput}>
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

      <View style={styles.passwordInput}>
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
    justifyContent: 'center',
  },
  titlePage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
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
    paddingHorizontal: 8
  },
  passwordInput: {
    width: '80%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textPassword: {
    flex: 1
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    width: 250,
    margin: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default RegisterScreen;