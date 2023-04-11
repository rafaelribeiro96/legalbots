import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import api from '../utils/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
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

    if (email !== confirmEmail) {
      setErrorMessage('Os endereços de email não coincidem');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Endereço de email inválido');
      return;
    }

    try {
      await api.post('/criar', { name, email, password });
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      setErrorMessage('Ocorreu um erro ao criar sua conta');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Cadastro de Usuário</Text>
      {errorMessage ? <Text style={{ color: 'red', marginBottom: 12 }}>{errorMessage}</Text> : null}
      <TextInput
        style={{ width: '80%', height: 48, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        onChangeText={setName}
        value={name}
        placeholder="Nome"
      />
      <TextInput
        style={{ width: '80%', height: 48, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        onChangeText={setEmail}
        value={email}
        placeholder="E-mail"
        keyboardType="email-address"
      />
      <TextInput
        style={{ width: '80%', height: 48, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        onChangeText={setConfirmEmail}
        value={confirmEmail}
        placeholder="Confirme seu e-mail"
        keyboardType="email-address"
      />
      <TextInput
        style={{ width: '80%', height: 48, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        onChangeText={setPassword}
        value={password}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <TextInput
        style={{ width: '80%', height: 48, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirme sua senha"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: 'black', padding: 12, width: 250, margin: 10, borderRadius: 10 }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', textTransform: 'uppercase' }}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ backgroundColor: 'black', padding: 12, width: 250, margin: 10, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', textTransform: 'uppercase' }}>Já tenho uma conta</Text>
      </TouchableOpacity>

    </View>
  );
};

export default RegisterScreen;