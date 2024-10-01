import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: 'CustomFont', // Comentado temporariamente
  },
  map: {
    flex: 1,
    width: '100%',
    // fontFamily: 'CustomFont', // Comentado temporariamente
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%', // Ajustar a largura conforme necessário
    // fontFamily: 'CustomFont', // Comentado temporariamente
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
    // fontFamily: 'CustomFont', // Comentado temporariamente
  },
});