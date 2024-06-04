import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { signInWithEmail } from '../../services/apiAuth'
export function useMagicLink() {
  const queryClient = useQueryClient()

  const {
    mutate: magicLink,
    isPending: magicLinkIsPending,
    isSuccess: magicLinkIsSuccess,
    error: magicLinkError
  } = useMutation({
    mutationFn: (email) => signInWithEmail(email),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  return { magicLink, magicLinkIsPending, magicLinkIsSuccess, magicLinkError }
}
