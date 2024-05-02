<script setup>
import ThePagination from '@/components/Products/ThePagination/ThePagination.vue'
import TheProducts from '../components/Products/TheProducts.vue'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '../services/apiProducts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const page = route.query.page || 1
// let catalog = []
// let count = 0
const { data, isPending } = useQuery({
  queryKey: ['products', page],
  queryFn: () => getProducts({ page })
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
      <TheProducts v-if="!isPending" :products="data?.products" :isPending="isPending" />
      <ThePagination v-if="!isPending" :totalCount="data?.count" :isPending="isPending" />
    </section>
  </main>
</template>
