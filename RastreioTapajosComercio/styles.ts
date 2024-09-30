import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'CustomFont', // Aplicar a fonte personalizada
  },
  map: {
    flex: 1,
    width: '100%',
    fontFamily: 'CustomFont', // Aplicar a fonte personalizada
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%', // Ajustar a largura conforme necessário
    fontFamily: 'CustomFont', // Aplicar a fonte personalizada
  },
  logo: {
    width: 200, // Ajustar a largura conforme necessário
    height: 200, // Ajustar a altura conforme necessário
    marginBottom: 20,
  },
  logoutButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'CustomFont', // Aplicar a fonte personalizada
  },
});