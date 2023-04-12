import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import splashScreen from './src/screens/SplashScreen';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium, Poppins_300Light  } from '@expo-google-fonts/poppins'
import { AuthProvider } from './src/context/AuthContext';
import RegisterScreen from './src/screens/RegisterScreen';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_300Light
  });

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
  
    async function preventAutoHide() {
      await SplashScreen.preventAutoHideAsync();
    }
  
    if (fontsLoaded) {
      hideSplashScreen();
      preventAutoHide();
    }
  }, [fontsLoaded]);
  

  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={splashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
