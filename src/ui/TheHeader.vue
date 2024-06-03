<script setup>
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

const cart = useCartStore()
</script>

<template>
  <header
    class="fixed bottom-0 left-0 right-0 grid h-20 grid-cols-4 content-center bg-white p-1 px-6 font-medium uppercase"
  >
    <RouterLink to="/products">My App</RouterLink>
    <nav class="col-span-3 grid grid-cols-3 gap-6">
      <nav class="flex justify-between">
        <RouterLink to="/products">Catalog</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
      </nav>
      <nav class="col-start-3 flex justify-between">
        <h1>Contact</h1>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/cart"
          >Cart<span v-if="cart.itemsInCart > 0"> ({{ cart.itemsInCart }})</span></RouterLink
        >
      </nav>
    </nav>
  </header>
</template>
