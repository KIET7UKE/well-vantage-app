import axios from 'axios';
import { getFromStore, setStore } from '../storage/device';
import { KeyConstants } from '../storage/constant';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.29.187:3000',
});

// Logging interceptors
axiosInstance.interceptors.request.use(request => {
  console.log('Starting Request', request.method, request.url);
  return request;
});

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.log('Response Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  },
);

// Auth interceptor (Setup once)
axiosInstance.interceptors.request.use(
  async config => {
    const token = await getFromStore(KeyConstants.ACCESS_TOKEN);
    const refreshToken = await getFromStore(KeyConstants.REFRESH_TOKEN);
    const deviceId = await getFromStore(KeyConstants.DEVICE_ID);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (refreshToken) {
      config.headers.refreshToken = refreshToken;
    }
    if (deviceId) {
      config.headers.deviceId = deviceId;
    }
    return config;
  },
  error => Promise.reject(error),
);

// No-op function for backward compatibility if needed,
// though the interceptor now fetches data dynamically.
export const setInterceptors = async () => {
  // We don't need to add new interceptors here anymore as the one above handles it dynamically.
};

export const updateToken = async (newToken: any) => {
  await setStore({ key: KeyConstants.ACCESS_TOKEN, value: newToken });
  axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
};

export default axiosInstance;
