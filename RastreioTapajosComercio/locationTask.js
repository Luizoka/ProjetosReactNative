import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    // Enviar dados de localização para a API
    console.log('Received new locations in background:', locations);
  }
});

export const startBackgroundUpdate = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 1,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });
  }
};

export const stopBackgroundUpdate = async () => {
  const tasks = await TaskManager.getRegisteredTasksAsync();
  const isTaskRegistered = tasks.some(task => task.taskName === LOCATION_TASK_NAME);
  if (isTaskRegistered) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  } else {
    console.log(`Task ${LOCATION_TASK_NAME} is not registered.`);
  }
};