import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium, Poppins_300Light  } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/context/AuthContext';
import SignInToken from './src/screens/SignInToken';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_300Light
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName="SignInToken">
        <Stack.Screen name="SignInToken" component={SignInToken} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
