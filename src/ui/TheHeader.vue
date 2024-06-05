<script setup>
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

const cart = useCartStore()
</script>

<template>
  <header
    class="fixed bottom-0 left-0 right-0 grid h-20 grid-cols-5 place-items-stretch content-center bg-white p-1 px-6 font-medium uppercase"
  >
    <RouterLink class="leading-20 justify-self-start" to="/products">My App</RouterLink>
    <nav class="col-span-4 grid grid-cols-3">
      <nav class="flex">
        <RouterLink to="/products">Catalog</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
      </nav>
      <nav class="col-start-3 flex">
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/cart"
          >Cart<span v-if="cart.itemsInCart > 0"> ({{ cart.itemsInCart }})</span></RouterLink
        >
      </nav>
    </nav>
  </header>
</template>

<style scoped>
nav a {
  position: relative;
  line-height: 5rem;
  text-align: center;
  flex-basis: 33.33%;
  transition: all 0.6s ease-in-out;
}

nav a:hover {
  transform: translateY(5px);
  background-color: rgb(75 85 99);
  color: rgb(255 255 255);
}
</style>
