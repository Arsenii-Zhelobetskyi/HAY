import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { getProducts } from '../services/apiProducts'
export function useProducts() {
  const route = useRoute()

  const page = route.query.page || 1
  // let catalog = []
  // let count = 0
  const { data, isPending } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts({ page })
  })

  return { data, isPending }
}
