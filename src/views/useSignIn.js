import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { signIn as signInApi } from '../services/apiAuth'
import { useRouter } from 'vue-router'

export function useSignIn() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    mutate: signIn,
    isPending: signInIsPending,
    error: signInError
  } = useMutation({
    mutationFn: ({ email, password }) => signInApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data)
      router.push('/')
    },
    onError: (error) => {
      console.log(error)
    }
  })
  return { signIn, signInIsPending, signInError }
}
