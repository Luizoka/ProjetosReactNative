import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  console.log('TaskManager defineTask called'); // Log para verificar se a tarefa está sendo registrada
  if (error) {
    console.error('TaskManager error:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log('Received new locations in background:', locations);

    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId'); // Obter o ID do usuário
      console.log('Token:', token);
      console.log('UserId:', userId);

      if (token && userId) {
       const { latitude, longitude } = locations[0].coords;
        const locationData = {
          userId: parseInt(userId, 10),
          latitude,
          longitude
        };
        console.log('Sending location data:', locationData);
        const response = await axios.put('http://192.168.31.10:3000/api/users/location', locationData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Location update response:', response.data);
      } else {
        console.warn('Token or userId not found');
      }
    } catch (err) {
      console.error('Error retrieving token or userId:', err);
    }
  }
});

export const startBackgroundUpdate = async () => {
  console.log('startBackgroundUpdate called'); // Log para verificar se a função está sendo chamada
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
    console.log('Background location permission granted'); // Log para verificar se a permissão foi concedida
    try {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
        foregroundService: {
          notificationTitle: 'Location Tracking',
          notificationBody: 'We are tracking your location in the background',
          notificationColor: '#fff',
        },
      });
      console.log('Background location tracking started'); // Log para verificar se o rastreamento foi iniciado
    } catch (error) {
      console.error('Error starting background location updates:', error);
    }
  } else {
    console.warn('Background location permission not granted');
  }
};

export const stopBackgroundUpdate = async () => {
  console.log('stopBackgroundUpdate called'); // Log para verificar se a função está sendo chamada
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  console.log('Background location tracking stopped'); // Log para verificar se o rastreamento foi parado
};