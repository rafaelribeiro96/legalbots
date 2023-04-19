import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium, Poppins_300Light  } from '@expo-google-fonts/poppins'
import * as SplashScreen from 'expo-splash-screen';

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
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
