import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { signUp as signUpApi, getCurrentUser } from '../../services/apiAuth'
import { useRouter } from 'vue-router'

export function useSignUp() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    mutate: signUp,
    isPending: signUpIsPending,
    error: signUpError
  } = useMutation({
    mutationFn: ({ email, password }) => signUpApi({ email, password }),
    onSuccess: async (data) => {
      queryClient.setQueryData(['user'], data)
      router.push('/')
    },
    onError: (error) => {
      console.log(error)
    }
  })
  return { signUp, signUpIsPending, signUpError }
}
