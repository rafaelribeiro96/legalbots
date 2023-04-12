import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen;
