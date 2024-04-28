<script setup>
import { getProduct } from '@/services/apiProducts'
import TheCarousel from './TheCarousel.vue'
import { useCartStore } from '@/stores/cart'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
const router = useRoute()

const { data, isPending, error } = useQuery({
  queryKey: ['product', router.params?.id],
  queryFn: () => getProduct(router.params?.id)
})
console.log(router.params.id)

const handleAddToCart = (newItem) => {
  useCartStore().addToCart(newItem)
}
</script>

<template>
  <div class="flex items-center justify-center gap-10">
    <div class="relative h-screen w-full pb-20">
      <TheCarousel :gallery="data?.gallery" />
    </div>
    <div class="max-w-96">
      <div class="mb-5 text-gray-600">Category</div>
      <div class="text-4xl font-medium">{{ data?.name }}</div>
      <div class="my-10 text-2xl text-gray-600">{{ data?.desc }}</div>
      <div class="text-2xl font-medium text-green-600">
        $ {{ data?.price }} (etc. VAT)

        <span class="text-2xl text-gray-600">| In stock: {{ data?.quantity }}</span>
      </div>
      <button
        class="mt-10 border-2 border-black bg-black px-24 py-4 text-2xl font-medium text-white hover:border-gray-600 hover:bg-gray-600"
        @click="handleAddToCart(data)"
      >
        Add to cart
      </button>
    </div>
    <div class="relative h-96 w-96"></div>
  </div>
</template>
