import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Verifica se o email e a senha são válidos para habilitar o botão de login
  useEffect(() => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setButtonEnabled(isValidEmail && isValidPassword);
  }, [email, password]);

  const handleLogin = () => {
    // Validando o email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, insira um email válido');
      return;
    } else {
      setEmailError('');
    }

    // Validando a senha
    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('A senha deve conter pelo menos 8 caracteres e um caractere especial');
      return;
    } else {
      setPasswordError('');
    }

    // TODO: enviar solicitação ao servidor para verificar as credenciais de login
    // se as credenciais forem válidas, navegue para a tela inicial do aplicativo
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.svg')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.appName}>LegalBots</Text>
      <Text style={styles.greeting}>Olá Novamente!</Text>
      <Text style={styles.subtitle}>Lorem ipsum dolor sit amet</Text>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Senha</Text>
        <View style={[styles.passwordInputContainer, styles.input]}>
          <TextInput
            style={[styles.passwordInput]}
            placeholder="Insira sua senha"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.passwordVisibilityButton}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => console.log('Esqueci minha senha')}
        >
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, buttonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={!buttonEnabled}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>
        <TouchableOpacity style={styles.googleLoginButton}>
          <Text style={styles.googleLoginText}>Fazer login com o Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'red', // borda vermelha
    borderWidth: 2,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: null,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    borderColor: 'red', // borda vermelha
    borderWidth: 2,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    borderColor: 'green', // borda verde
    borderWidth: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    borderColor: 'blue', // borda azul
    borderWidth: 2,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 5,
    borderColor: 'purple', // borda roxa
    borderWidth: 2,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    height: 50,
  },
  buttonEnabled: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#ccc',
  },
  googleLoginButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  googleLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});





export default LoginScreen;