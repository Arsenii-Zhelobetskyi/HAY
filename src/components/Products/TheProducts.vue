<script setup>
import ProductsItem from './ProductsItem.vue'

defineProps(['products', 'isShow'])
</script>

<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8 mb-20">
    <ProductsItem
      v-magnetic
      v-for="(productsItem, index) in products"
      :key="productsItem.id"
      :item="productsItem"
      :isShow="isShow"
      :number="index"
    />
  </div>
</template>
