import { apiClient } from './client';

export const postAPI = async <T>(url: string, data: any): Promise<T & { success: boolean }> => {
  try {
    const response = await apiClient.post(url, data);
    return {
      ...response.data,
      success: true,
    };
  } catch (error: any) {
    console.error(`POST ${url} failed`, error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    } as any;
  }
};
