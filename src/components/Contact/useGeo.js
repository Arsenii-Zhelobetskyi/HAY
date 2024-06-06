import { useQuery } from '@tanstack/vue-query'
import { getLocation as getLocationApi } from '../../services/apiGeo'

export function useGeo() {
  const {
    isPending: getLocationIsPending,
    isSuccess: getLocationIsSuccess,
    error: getLocationError
  } = useQuery({
    queryKey: ['location'],
    queryFn: getLocationApi
  })

  return {
    getLocationIsPending,
    getLocationIsSuccess,
    getLocationError
  }
}
