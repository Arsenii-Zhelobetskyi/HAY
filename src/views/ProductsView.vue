<script setup>
import ThePagination from '@/components/Products/ThePagination/ThePagination.vue'
import TheProducts from '../components/Products/TheProducts.vue'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '../services/apiProducts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const page = computed(() => route.query.page || '1')

const { data, isPending } = useQuery({
  queryKey: ['products', page],
  queryFn: () => getProducts({ page: page.value })
})
</script>

<template>
  <main class="grid grid-cols-4 px-6 pb-20 pt-8 font-normal">
    <aside>
      <div class="fixed">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </aside>
    <section class="col-span-3">
      <TheProducts :products="data?.products" :isPending="isPending" />
      <ThePagination :count="data?.count" :isPending="isPending" />
    </section>
  </main>
</template>
