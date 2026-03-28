import axiosInstance from '../apis/axiosInstance';

// Consolidated with src/apis/axiosInstance.ts to resolve 401 Unauthorized issues
// and ensure consistent token handling.
export const apiClient = axiosInstance;
