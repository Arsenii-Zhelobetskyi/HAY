<script setup>
import { getProduct } from '@/services/apiProducts'
import TheCarousel from './TheCarousel.vue'
import { useCartStore } from '@/stores/cart'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()

const { data, isPending, error } = useQuery({
  queryKey: ['product', route.params?.id],
  queryFn: () => getProduct(route.params?.id)
})

const handleAddToCart = (newItem) => {
  const isInCart = useCartStore().cart.some((item) => item.id === newItem.id)
  if (isInCart) {
    useCartStore().deleteFromCart(newItem.id)
    toast.success('Product removed from cart', {
      timeout: 3000,
      hideProgressBar: true,
      showCloseButtonOnHover: true
    })
  } else {
    useCartStore().addToCart(newItem)
    toast.success('Product added to cart', {
      timeout: 3000,
      hideProgressBar: true,
      showCloseButtonOnHover: true
    })
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-10">
    <div class="relative h-screen w-full pb-20">
      <TheCarousel :gallery="data?.images" />
    </div>
    <div class="max-w-96">
      <div class="mb-5 text-gray-600">Category</div>
      <div v-hoverable class="text-4xl font-medium">{{ data?.name }}</div>

      <div class="my-10 text-2xl text-gray-600">{{ data?.desc }}</div>
      <div class="text-2xl font-medium text-green-600">
        $ {{ data?.price }} (etc. VAT)
        <span class="text-2xl text-gray-600">| In stock: {{ data?.quantity }}</span>
      </div>
      <button
        v-hoverable
        class="mt-10 border-2 border-black bg-black px-24 py-4 text-2xl font-medium text-white hover:border-gray-600 hover:bg-gray-600"
        @click="handleAddToCart(data)"
      >
        {{
          useCartStore().cart.some((item) => item.id === data?.id)
            ? 'Remove from cart'
            : 'Add to cart'
        }}
      </button>
    </div>
    <div class="relative h-96 w-96"></div>
  </div>
</template>
