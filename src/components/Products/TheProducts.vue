<script setup>
import ProductsItem from './ProductsItem.vue'

defineProps(['products', 'isShow'])
</script>

<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8">
    <ProductsItem
      v-magnetic
      v-for="productsItem in products"
      :key="productsItem.id"
      :item="productsItem"
      :isShow="isShow"
    />
  </div>
</template>
