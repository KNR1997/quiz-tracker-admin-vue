import { message } from '@/utils/message'
import { removeToken } from '@/utils/auth/token'
import { router } from '@/router'

export function handleApiError(errorMessage: string, status?: number) {
  message.error(errorMessage)

  if (status === 401) {
    removeToken()

    message.warning('Session expired. Please login again.')

    router.push('/login')
  }
}
