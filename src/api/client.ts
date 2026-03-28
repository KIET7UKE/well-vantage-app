import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAuthToken = async () => await AsyncStorage.getItem('user_token');
export const setAuthToken = async (token: string) => await AsyncStorage.setItem('user_token', token);
export const removeAuthToken = async () => await AsyncStorage.removeItem('user_token');
