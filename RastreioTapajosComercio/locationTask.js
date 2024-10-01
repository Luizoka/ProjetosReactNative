import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log('Received new locations in background:', locations);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        await axios.post('http://192.168.8.83:3000/api/locations', { locations }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (err) {
        console.error('Error sending location data:', err);
      }
    }
  }
});

export const startBackgroundUpdate = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
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
  }
};

export const stopBackgroundUpdate = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log('Received new locations in background:', locations);
  }
});