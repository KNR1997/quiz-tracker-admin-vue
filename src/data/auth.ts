import { useMutation } from '@tanstack/vue-query'
import { authClient } from '@/api/auth-client'
import { setToken } from '@/utils/auth/token'
import { message } from '@/utils/message'
import { useRouter } from 'vue-router'

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: authClient.login,

    onSuccess: (data) => {
      setToken(data.token)

      message.success('Login successful')

      router.push('/')
    },
  })
}
