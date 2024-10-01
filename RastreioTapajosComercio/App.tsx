import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font'; // Comentado temporariamente
import LoginScreen from './LoginScreen';
import MapScreen from './MapScreen';
import { stopBackgroundUpdate } from './locationTask'; // Importar a função de parar o rastreamento

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(true); // Alterado para true temporariamente

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        setIsLoggedIn(true);
      }
    };

    const loadResources = async () => {
      try {
        // await Font.loadAsync({
        //   'Poppins-Regular': require('./fonts/Poppins-Regular.ttf'), // Substitua pelo caminho correto da sua fonte
        // });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    };

    loadResources();
    checkLoginStatus();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    await stopBackgroundUpdate(); // Parar o rastreamento de localização em segundo plano
    setIsLoggedIn(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {isLoggedIn ? (
        <MapScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;