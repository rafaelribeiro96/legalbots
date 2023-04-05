import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: enviar solicitação ao servidor para verificar as credenciais de login
    // se as credenciais forem válidas, navegue para a tela inicial do aplicativo
    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="E-mail ou nome de usuário"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
