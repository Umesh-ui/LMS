import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving data', e);
  }
};

// Load data
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error reading data', e);
    return null;
  }
};

// Word count helper
export const wordCount = text => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};
