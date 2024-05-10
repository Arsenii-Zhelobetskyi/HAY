import { useQuery } from '@tanstack/vue-query'
import { getCurrentUser } from '../services/apiAuth'
export function useUser() {
  const {
    isPending,
    fetchStatus,
    data: user
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })
  return {
    isPending,
    user,
    isAuthenticated: user?.role === 'authenticated',
    fetchStatus
  }
} //get current user a
