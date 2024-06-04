<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { decreaseProductQuantity } from '@/services/apiProducts.js'
import { addOrder } from '@/services/apiOrders.js'
import { useCartStore } from '@/stores/cart'
import {getProduct} from '@/services/apiProducts.js'

import TheCart from '../components/Cart/TheCart.vue'
import MainButton from '../ui/MainButton.vue'
import { useToast } from 'vue-toastification'

const cart = useCartStore()
const router = useRouter()
const toast = useToast()

async function confirmCheckout() {
  const cartItems = cart.cart
  for (const item of cartItems) {
    const product = await getProduct(item.id);
    const totalPrice = product.price * item.amount;
    await decreaseProductQuantity(item.id, item.amount);
    await addOrder(item.id, item.amount, totalPrice);
  }
  toast.success('The purchase is successful !', {
    timeout: 3000,
    hideProgressBar: true,
    showCloseButtonOnHover: true
  })
  cart.clearTheCart()
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
