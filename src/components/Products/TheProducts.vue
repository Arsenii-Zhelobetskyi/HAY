<script setup>
import ProductsItem from './ProductsItem.vue'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '../../services/apiProducts'

const { data: catalog, isPending } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts
})
</script>

<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8">
    <ProductsItem v-for="catalogItem in catalog" :key="catalogItem.id" :item="catalogItem" />
  </div>
</template>
