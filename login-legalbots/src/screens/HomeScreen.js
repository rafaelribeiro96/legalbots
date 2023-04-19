import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import logoRobo from "../../assets/logoRobo.png";
import fonts from '../styles/fonts';
import colors from '../styles/colors';

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={logoRobo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Bem-vindo ao LegalBots</Text>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#ccc"
        onPress={() => {
          signOut();
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 30,
    fontFamily: fonts.font_600,
  },
  button: {
    backgroundColor: colors.secundaria,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: colors.bordaInput,
    fontFamily: fonts.font_600,
  },
});

export default HomeScreen;
