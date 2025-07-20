import axios from 'axios';
import { cookies } from 'next/headers';

export const createServerAxiosInstance = async () => {
  const cookieStore = await cookies(); // Add await here
  const accessToken = cookieStore.get('accessToken')?.value;

  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
};

export const serverCallApi = async <T>(
  requestFunction: (axiosInstance: any) => Promise<{ data: T }>
): Promise<T> => {
  try {
    const axiosInstance = await createServerAxiosInstance(); // Add await here
    const response = await requestFunction(axiosInstance);
    return response.data;
  } catch (error: any) {
    console.error('Server API Error:', error.response?.data || error.message);
    throw error;
  }
};
