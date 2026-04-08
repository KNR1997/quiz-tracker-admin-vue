import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import type { LoginInput, AuthResponse } from '@/types'

export const authClient = {
  login: (data: LoginInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, data),
}
