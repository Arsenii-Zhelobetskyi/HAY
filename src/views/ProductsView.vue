<script setup>
import ThePagination from '@/components/Products/ThePagination/ThePagination.vue'
import TheProductsAside from '../components/Products/ProductsAside.vue'
import TheProducts from '../components/Products/TheProducts.vue'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '../services/apiProducts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const page = computed(() => route.query.page || '1')
const category = computed(() => route.query.category || '0')

const { data, isPending } = useQuery({
  queryKey: ['products', page, category],
  queryFn: () => getProducts({ page: page.value, category: category.value })
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
