<script setup>
import { useCartStore } from '@/stores/cart'
defineProps(['item'])

const handleAddToCart = (newItem) => {
  useCartStore().addToCart(newItem)
}
</script>
<template>
  <div class="hover: flex flex-col hover:cursor-pointer" @click="handleAddToCart(item)">
    <div class="flex justify-between">
      <div>
        {{ item.name }}
      </div>
      <div>
        {{ item.price }}
      </div>
    </div>
    <div class="flex-1">
      <img :src="item.image" alt="chair" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
