<script setup>
import { defineProps, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
const props = defineProps(['item'])
const amount = ref(1)
const cart = useCartStore()
const addAmount = (id) => {
  amount.value++
  cart.addAmount(id, amount)
}
const removeAmount = (id) => {
  amount.value--
  cart.deleteAmount(id, amount)
}
</script>
<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="">
      <img :src="item.image" alt="chair" class="h-full w-full object-cover" />
    </div>
    <div class="flex flex-col justify-center gap-4">
      <div class="text-4xl font-medium">
        {{ item.name }}
      </div>
      <div class="text-2xl font-light text-gray-600">
        $ {{ item.price }}
        |
        <span v-if="item.quantity > 0" class="text-green-600"> In stock </span>
        <span v-else class="text-red-600"> Out of stock </span>
      </div>
    </div>

    <div class="flex items-center justify-center text-3xl">
      <div class="flex w-40 justify-between">
        <button
          class="h-10 w-10 border-2 hover:bg-gray-200 disabled:bg-gray-200"
          @click="removeAmount(item.id)"
          :disabled="amount <= 1"
        >
          -
        </button>
        <input v-model="amount" class="max-w-9 text-center" />
        <button
          class="h-10 w-10 border-2 hover:bg-gray-200 disabled:bg-gray-200"
          @click="addAmount(item.id)"
          :disabled="amount >= 99 || amount >= item.quantity"
        >
          +
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center text-3xl">
      <div class="relative flex flex-col">
        $ {{ item.price * amount }}
        <button
          class="absolute top-20 text-gray-600 hover:underline"
          @click="cart.deleteFromCart(item.id)"
        >
          remove
        </button>
      </div>
    </div>
  </div>
</template>
