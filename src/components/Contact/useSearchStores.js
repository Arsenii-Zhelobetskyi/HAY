import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { fullTextSearchOnStores as searchStoresApi } from '../../services/apiSearch'
export function useSearchStores() {
  const queryClient = useQueryClient()

  const {
    mutate: searchStores,
    isPending: searchStoresIsPending,
    isSuccess: searchStoresIsSuccess,
    error: searchStoresError
  } = useMutation({
    mutationFn: ({ searchQuery, page }) => searchStoresApi({ searchQuery, page }),
    onSuccess: (data, variables) => {
      const { page } = variables
      if (page && data.length > 0) {
        const oldData = queryClient.getQueryData(['searchStores'])

        const newData = [...oldData, ...data]
        console.log('newData', newData)
        queryClient.setQueryData(['searchStores'], newData)
        return
      } else if (page && data.length === 0) {
        //we scrolled down to the end of the list
        return
      }

      queryClient.setQueryData(['searchStores'], data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return {
    searchStores,
    searchStoresIsPending,
    searchStoresIsSuccess,
    searchStoresError
  }
}
