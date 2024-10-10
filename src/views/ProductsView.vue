<script setup>
import { PAGE_SIZE } from '../utils/constants.js'

import ThePagination from '@/components/Products/ThePagination/ThePagination.vue'
import TheProductsAside from '../components/Products/ProductsAside.vue'
import TheProducts from '../components/Products/TheProducts.vue'
import BaseSpinner from '../ui/BaseSpinner.vue'

import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProducts } from '../services/apiProducts'


const queryClient = useQueryClient()
const route = useRoute()

const page = computed(() => Number(route.query.page) || 1)
const category = computed(() => route.query.category || undefined)
const tag= computed(() => route.query.tag)
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
  queryKey: ['products', page, filter, sortBy, tag],
  queryFn: () => getProducts({ page: page.value, filter: filter.value, sortBy: sortBy.value,tag:tag.value })
})


const pageCount = computed(() => {
  return Math.ceil(data?.value?.count / PAGE_SIZE)
})
watch([page, filter, sortBy, pageCount,tag], () => {
  if (Number(page.value) < pageCount.value) {
    queryClient.prefetchQuery({
      queryKey: ['products', Number(page.value) + 1, filter, sortBy,tag],
      queryFn: () =>
        getProducts({ filter: filter.value, sortBy: sortBy.value, page: Number(page.value) + 1,tag:tag.value })
    })
    if (page.value > 1) {
      queryClient.prefetchQuery({
        queryKey: ['products', Number(page.value) -1,filter, sortBy ,tag],
        queryFn: () =>
          getProducts({ filter: filter.value, sortBy: sortBy.value, page: page.value - 1,tag:tag.value })
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
    <section class="col-span-3 relative mb-20">
      <transition name="transition" mode="out-in">
        <div v-show="isPending">
          <base-spinner></base-spinner>
        </div>
      </transition>

      <transition name="transition" mode="in-out">
        <div v-show="!isPending" >
          <TheProducts :products="data?.products"  />
          <ThePagination :count="data?.count" :isPending="isPending" />
        </div>
      </transition>
    </section>
  </main>
</template>

