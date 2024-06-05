export function useSearchStores(){
    const {mutate:searchStores, isLoading:searchStoresIsLoading, error:searchStoresError} = useMutation({
        mutationFn: ({search}) => searchStoresApi({search}),
        onSuccess: (data) => {
            queryClient.setQueryData(['stores'], data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}