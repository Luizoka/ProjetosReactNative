import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': require('./fonts/Poppins-Regular.ttf'),
  });
};

export default loadFonts;