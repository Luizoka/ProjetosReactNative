import React, { useEffect, useState, useCallback } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import MapScreen from './MapScreen';
import { stopBackgroundUpdate } from './locationTask';

SplashScreen.preventAutoHideAsync();

const loadFonts = () => {
  return Font.loadAsync({
    'CustomFont': require('./fonts/Poppins-Regular.ttf'),
  });
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedUsername && storedPassword) {
        console.log(`Stored Username: ${storedUsername}, Stored Password: ${storedPassword}`);
        setIsLoggedIn(true);
        // Não iniciar o rastreamento de localização em segundo plano automaticamente
      }
    };

    checkLogin();

    return () => {
      stopBackgroundUpdate(); // Parar rastreamento em segundo plano ao desmontar
    };
  }, []);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Não iniciar o rastreamento de localização em segundo plano automaticamente
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    stopBackgroundUpdate(); // Parar rastreamento em segundo plano
  };

  if (!fontsLoaded) {
    return null; // Retorna null até que as fontes sejam carregadas
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <MapScreen onLogout={handleLogout} />;
}