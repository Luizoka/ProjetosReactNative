import React, { useState } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (username && password) {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      onLogin();
    } else {
      alert('Por favor, insira um nome de usuário e senha válidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logotapajoscomercio.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;