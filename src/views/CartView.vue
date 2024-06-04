<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

import TheCart from '../components/Cart/TheCart.vue'
import MainButton from '../ui/MainButton.vue'
const cart = useCartStore()
const router = useRouter()

function confirmCheckout() {
  router.push('/checkout')
}
</script>

<template>
  <main class="grid grid-cols-4 px-6 pb-20 pt-8 font-normal">
    <aside class="relative flex justify-center">
      <div
        class="fixed top-1/4 flex flex-col items-center justify-center gap-10 text-2xl font-light text-gray-600"
      >
        <div class="text-4xl font-medium text-black">Your cart</div>
        <template v-if="cart.totalAmount > 0">
          <div>
            You have picked
            <span class="font-medium text-black">{{ cart.totalAmount }}</span> item(s)
          </div>
          <div>
            Your total is <span class="font-medium text-green-600">$ {{ cart.totalPrice }}</span>
          </div>

          <MainButton :function="confirmCheckout">Checkout</MainButton>
        </template>
        <div v-else>Your cart is empty</div>
        <RouterLink
          to="/products"
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
  </main>
</template>
