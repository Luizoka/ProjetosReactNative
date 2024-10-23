import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { startBackgroundUpdate } from './locationTask'; // Importar a função de rastreamento

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log('Attempting to log in with:', { name, password });
    try {
      const response = await axios.post('http://192.168.31.10:3000/api/users/login', { name, password });
      console.log('Login response:', response.data);
      const { userId, token } = response.data;
      await AsyncStorage.setItem('userId', userId.toString()); // Salvar o ID do usuário
      await AsyncStorage.setItem('token', token);
      await startBackgroundUpdate(); // Iniciar o rastreamento de localização em segundo plano
      onLogin();
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async () => {
    console.log('Attempting to register with:', { name, password });
    try {
      const response = await axios.post('http://192.168.31.10:3000/api/users/register', { name, password });
      console.log('Register response:', response.data);
      const { userId, token } = response.data;
      await AsyncStorage.setItem('userId', userId.toString()); // Salvar o ID do usuário
      await AsyncStorage.setItem('token', token);
      await startBackgroundUpdate(); // Iniciar o rastreamento de localização em segundo plano
      onLogin();
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Register error:', axiosError);
      console.log('Error details:', axiosError.response ? axiosError.response.data : axiosError.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/LOGO_1.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
      <View style={styles.buttonSpacing} />
      <Button title="Cadastro" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 300, // Adjust the width as needed
    height: 105, // Adjust the height as needed
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    // fontFamily: 'Poppins-Regular', // Comentado temporariamente
  },
  error: {
    color: 'red',
    marginBottom: 12,
    // fontFamily: 'Poppins-Regular', // Comentado temporariamente
  },
  buttonSpacing: {
    height: 10, // Adjust the height as needed for spacing
  },
});

export default LoginScreen;