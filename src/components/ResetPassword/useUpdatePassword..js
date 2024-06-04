import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { updatePassword as updatePasswordApi } from '../../services/apiAuth'
import { useToast } from 'vue-toastification'

export function useUpdatePassword() {
  const router = useRouter()
  const toast = useToast()

  const {
    mutate: updatePassword,
    isPending: updatePasswordIsPending,
    error: updatePasswordError
  } = useMutation({
    mutationFn: (newPassword) => updatePasswordApi(newPassword),
    onSuccess: async () => {
      router.push('/')
      toast.success('Password has changed successfully', {
        timeout: 3000,
        hideProgressBar: true,
        showCloseButtonOnHover: true
      })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  return { updatePassword, updatePasswordIsPending, updatePasswordError }
}
