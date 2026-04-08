import type { ApiErrorResponse, ApiResponse } from '@/types/api'
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { useMessage } from 'naive-ui'

// create an Axios instance
const baseURL = import.meta.env.VITE_APP_BASE_API?.trim() || 'http://localhost:8080/api'

const Axios = axios.create({
  baseURL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// Axios.interceptors.request.use(
//   (config) => {
//     // 1️⃣ Dynamic base API (Electron setup)
//     // const baseApi = baseURL();

//     // 2️⃣ Inject auth token (Zustand-safe)
//     // const { userToken } = useUserStore.getState();
//     // const accessToken = userToken?.accessToken;

//     // if (accessToken) {
//     //   config.headers.Authorization = `Bearer ${accessToken}`;
//     // }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor to handle the consistent API response structure
Axios.interceptors.response.use(
  (response) => {
    // The backend always returns { success, data, message, error }
    // Return the full response, the HttpClient will extract data
    return response
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const toast = useMessage()
    const { response, message } = error || {}

    // Extract error message from our consistent API response
    const errorMessage = response?.data?.message || message || 'An error occurred'

    // Log error (you can replace with your toast/notification system)
    console.error('API Error:', errorMessage)
    toast.error('error')

    // Handle 401 Unauthorized
    if (response?.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem('token')
      // window.location.href = '/login';
    }

    return Promise.reject(error)
  },
)

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<ApiResponse<T>>(url, { params })
    return response.data.data
  }

  static async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await Axios.post<ApiResponse<T>>(url, data, config)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    return response.data.data
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data)
    return response.data
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url)
    return response.data
  }
}
