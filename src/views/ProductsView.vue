<script setup>
import { PAGE_SIZE } from '../utils/constants.js'

import ThePagination from '@/components/Products/ThePagination/ThePagination.vue'
import TheProductsAside from '../components/Products/ProductsAside.vue'
import TheProducts from '../components/Products/TheProducts.vue'
import BaseSpinner from '../ui/BaseSpinner.vue'

import { useQueryClient } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '../services/apiProducts'
import { useRoute } from 'vue-router'
import { computed, watch, ref, onMounted } from 'vue'

onMounted(() => {
  isShow.value = false

  if (!isPending.value) {
    setTimeout(() => {
      isShow.value = true
    }, 2000)
  }
})

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

const isShow = ref(false)

const { data, isPending } = useQuery({
  queryKey: ['products', page, filter, sortBy],
  queryFn: () => getProducts({ page: page.value, filter: filter.value, sortBy: sortBy.value })
})

watch([isPending], () => {
  if (!isPending.value) {
    console.log(isPending.value)
    setTimeout(() => {
      isShow.value = true
    }, 1000)
  }
})

const pageCount = computed(() => {
  return Math.ceil(data?.value?.count / PAGE_SIZE)
})

watch([page, filter, sortBy, pageCount], () => {
  if (Number(page.value) < pageCount.value) {
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
      <transition name="transition" mode="in-out">
        <div v-if="!isShow">
          <base-spinner></base-spinner>
        </div>
      </transition>

      <transition name="transition" mode="out-in">
        <div v-if="isShow">
          <TheProducts :products="data?.products" :isShow="isShow" />
          <ThePagination :count="data?.count" :isPending="isPending" />
        </div>
      </transition>
    </section>
  </main>
</template>

<style scoped>
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
  transform: translateY(-350px);
}

.transition-enter-active {
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.transition-leave-active {
  transition:
    opacity 1s ease-in,
    transform 1s ease-in;
}

.transition-enter-to,
.transition-leave-from {
  opacity: 1;
  transform: translateY(-50px);
}
</style>
