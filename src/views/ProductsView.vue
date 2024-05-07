<script setup>
import { PAGE_SIZE } from '../utils/constants.js'

import ThePagination from '@/components/Products/ThePagination/ThePagination.vue'
import TheProductsAside from '../components/Products/ProductsAside.vue'
import TheProducts from '../components/Products/TheProducts.vue'

import { useQueryClient } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '../services/apiProducts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { watch } from 'vue'
const queryClient = useQueryClient()
const route = useRoute()

const page = computed(() => route.query.page || '1')

const category = computed(() => route.query.category || undefined)
const filter = computed(() =>
  !category.value ? undefined : { field: 'category', value: category.value }
)
const sortBy = computed(() => {
  const sortByParam = route.query.sortBy || undefined
  return sortByParam
    ? { field: sortByParam.split('-')[0], direction: sortByParam.split('-')[1] }
    : undefined
})

const { data, isPending } = useQuery({
  queryKey: ['products', page, filter, sortBy],
  queryFn: () => getProducts({ page: page.value, filter: filter.value, sortBy: sortBy.value })
})

const pageCount = computed(() => {
  // console.log(data?.value?.count)
  return Math.ceil(data?.value?.count / PAGE_SIZE)
})

watch([page, filter, sortBy, pageCount], () => {
  if (Number(page.value) < pageCount.value) {
    console.log(page.value)
    queryClient.prefetchQuery({
      queryKey: ['products', filter, sortBy, Number(page.value) + 1],
      queryFn: () =>
        getProducts({ filter: filter.value, sortBy: sortBy.value, page: Number(page.value) + 1 })
    })
    if (page.value > 1) {
      queryClient.prefetchQuery({
        queryKey: ['products', filter, sortBy, page.value - 1],
        queryFn: () =>
          getProducts({ filter: filter.value, sortBy: sortBy.value, page: page.value - 1 })
      })
    }
  }
})
</script>

<template>
  <main class="grid grid-cols-4 px-6 pb-20 pt-8 font-normal">
    <aside>
      <TheProductsAside />
    </aside>
    <section class="col-span-3">
      <TheProducts :products="data?.products" :isPending="isPending" />
      <ThePagination :count="data?.count" :isPending="isPending" />
    </section>
  </main>
</template>
