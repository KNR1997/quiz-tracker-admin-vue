import type { ApiErrorResponse, ApiResponse } from '@/types/api'
import { getToken } from '@/utils/auth/token'
import { handleApiError } from './error-handler'
import { ApiError } from '@/types/api'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_APP_BASE_API?.trim() || 'http://localhost:8080/api'

const Axios = axios.create({
  baseURL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/* ---------------- REQUEST INTERCEPTOR ---------------- */

Axios.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

Axios.interceptors.response.use(
  (response) => {
    const apiResponse = response.data as ApiResponse

    if (!apiResponse.success) {
      throw new ApiError(apiResponse.message, response.status)
    }

    return apiResponse.data
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status

    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong'

    handleApiError(errorMessage, status)

    return Promise.reject(new ApiError(errorMessage, status))
  },
)

/* ---------------- HTTP CLIENT ---------------- */

export class HttpClient {
  static get<T>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return Axios.get(url, { params, ...config })
  }

  static post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return Axios.post(url, data, config)
  }

  static put<T>(url: string, data?: unknown): Promise<T> {
    return Axios.put(url, data)
  }

  static delete<T>(url: string): Promise<T> {
    return Axios.delete(url)
  }
}
