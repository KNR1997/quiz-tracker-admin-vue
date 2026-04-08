export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
  error: string | null
}

export interface ApiErrorResponse {
  success: false
  data: null
  message: string
  error: string | null
}

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
