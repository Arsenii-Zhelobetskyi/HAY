<script setup>
import ProductsItem from './ProductsItem.vue'

defineProps(['products', 'isPending'])
</script>

<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8">
    <div v-if="isPending" class="col-span-3 text-center">Loading...</div>
    <ProductsItem
      v-else
      v-for="productsItem in products"
      :key="productsItem.id"
      :item="productsItem"
    />
  </div>
</template>
