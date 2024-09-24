import React, { useEffect, useState, useRef } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
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

const MapScreen = ({ onLogout }: { onLogout: () => void }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(true);

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
          mapRef.current?.animateCamera({
            center: response.coords
          });
        });
      })();
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isTracking]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    onLogout();
  };

  return (
    <View style={styles.container}>
      <View style={localStyles.buttonContainer}>
        <Button
          title={isTracking ? "Desligar Localização" : "Ligar Localização"}
          onPress={() => setIsTracking(!isTracking)}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          color="red"
        />
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
});

export default MapScreen;