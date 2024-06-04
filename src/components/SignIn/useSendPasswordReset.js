import { sendResetPassword as sendResetPasswordApi } from '@/services/apiAuth'
import { useMutation } from '@tanstack/vue-query'

export function useSendPasswordReset() {
  const {
    mutate: sendPasswordReset,
    isPending: sendPasswordResetIsPending,
    isSuccess: sendPasswordResetIsSuccess,
    error: sendPasswordResetError
  } = useMutation({
    mutationFn: (email) => sendResetPasswordApi(email),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  return {
    sendPasswordReset,
    sendPasswordResetIsSuccess,
    sendPasswordResetIsPending,
    sendPasswordResetError
  }
}
