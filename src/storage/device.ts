import AsyncStorage from '@react-native-async-storage/async-storage'; // Importing AsyncStorage from React Native Async Storage module
import {KeyConstants} from './constant';

// Function to set a key-value pair in storage
export const setStore = async ({
  key,
  value,
}: {
  key: KeyConstants; // Accepts a KeyConstants enum value as key
  value: string | object; // Allowing value to be either string or object
}): Promise<void> => {
  try {
    // Stringifying the value if it's not a string
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    console.log(key, stringValue, '<--------- key value');
    await AsyncStorage.setItem(key, stringValue); // Using AsyncStorage to set the key-value pair
  } catch (error) {
    console.error('Error setting value in AsyncStorage:', error); // Handling errors
  }
};

// Function to get a value from storage using a key
export const getFromStore = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key); // Using AsyncStorage to get the value corresponding to the key
    return value; // Returning the retrieved value
  } catch (error) {
    console.error('Error getting value from AsyncStorage:', error); // Handling errors
    return null;
  }
};

// Function to clear all items from storage
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear(); // Using AsyncStorage to clear storage
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error); // Handling errors
  }
};