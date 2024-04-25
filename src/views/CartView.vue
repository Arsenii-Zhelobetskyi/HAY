<script setup>
import TheCart from '../components/Cart/TheCart.vue'
import { RouterLink, useRouter } from 'vue-router'

import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
const router = useRouter()

function confirmCheckout() {
  router.push('/checkout')
}
</script>

<template>
  <aside class="relative flex justify-center">
    <div
      class="fixed top-1/4 flex flex-col items-center justify-center gap-10 text-2xl font-light text-gray-600"
    >
      <div class="text-4xl font-medium text-black">Your cart</div>
      <template v-if="cart.totalAmount > 0">
        <div>
          You have picked <span class="font-medium text-black">{{ cart.totalAmount }}</span> item(s)
        </div>
        <div>
          Your total is <span class="font-medium text-green-600">$ {{ cart.totalPrice }}</span>
        </div>
        <button
          @click="confirmCheckout"
          class="border-4 border-black bg-black px-20 py-4 font-medium text-white hover:border-gray-600 hover:bg-gray-600"
        >
          Checkout
        </button>
      </template>
      <div v-else>Your cart is empty</div>
      <RouterLink
        to="/"
        class="border-4 border-gray-600 px-10 py-4 font-medium hover:bg-gray-600 hover:text-white"
      >
        back to products
      </RouterLink>
      <button v-if="cart.totalAmount > 0" class="hover:underline" @click="cart.clearTheCart()">
        Clear the cart
      </button>
    </div>
  </aside>

  <TheCart class="col-span-3" />
</template>
