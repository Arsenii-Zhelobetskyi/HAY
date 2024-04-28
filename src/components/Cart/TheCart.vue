<script setup>
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>
<template>
  <div class="grid gap-6 gap-y-8">
    <CartItem v-for="item in cartStore.cart" :key="item.id" :item="item" />
  </div>
</template>
