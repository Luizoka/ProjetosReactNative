import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { startBackgroundUpdate, stopBackgroundUpdate } from './locationTask'; // Importar funções de rastreamento

const MapScreen = ({ onLogout }: { onLogout: () => void }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false); // Desligado por padrão

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    let subscription: any = null;
    if (isTracking) {
      (async () => {
        subscription = await watchPositionAsync({
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1
        }, (response) => {
          setLocation(response);
          console.log('Received new locations in foregrounda:', response);
          mapRef.current?.animateCamera({
            center: response.coords
          });
        });
        await startBackgroundUpdate(); // Iniciar rastreamento em segundo plano
      })();
    } else {
      stopBackgroundUpdate(); // Parar rastreamento em segundo plano
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isTracking]);

  const handleLogout = async () => {
    setIsTracking(false); // Parar o rastreamento ao fazer logout
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    onLogout();
  };

  return (
    <View style={styles.container}>
      <View style={localStyles.buttonContainer}>
        <TouchableOpacity onPress={() => setIsTracking(!isTracking)}>
          <Image
            source={isTracking ? require('./assets/botao_desligado.png') : require('./assets/botao_ligado.png')}
            style={localStyles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={localStyles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>
      {
        isTracking ? (
          location && (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
            </MapView>
          )
        ) : (
          <Text>Você está desconectado</Text>
        )
      }
    </View>
  );
};

const localStyles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonImage: {
    width: 50, // Ajuste conforme necessário
    height: 50, // Ajuste conforme necessário
  },
  logoutButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'Poppins-Regular', // Comentado temporariamente
  },
});

export default MapScreen;