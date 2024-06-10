<script setup>
import { getProduct } from '@/services/apiProducts'
import TheCarousel from './TheCarousel.vue'
import BackArrowLink from '../../ui/BackArrowLink.vue'
import { useCartStore } from '@/stores/cart'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ref, watch, onMounted } from 'vue'

const route = useRoute()
const toast = useToast()
const cartStore = useCartStore()

onMounted(() => {
  const item = cartStore.cart.find((item) => item?.id === route.params?.id)
  amount.value = item ? item.amount : 0
})

const { data } = useQuery({
  queryKey: ['product', route.params?.id],
  queryFn: () => getProduct(route.params?.id)
})

const amount = ref(null)

watch(amount, (newAmount) => {
  return newAmount
})

const isInCart = (newItem) => {
  return cartStore.cart.some((item) => item?.id === newItem?.id)
}

const handleAddToCart = (newItem) => {
  if (isInCart(newItem)) {
    cartStore.deleteFromCart(newItem.id)
    amount.value = 0
    toast.success('Product removed from cart', {
      timeout: 3000,
      hideProgressBar: true,
      showCloseButtonOnHover: true
    })
  } else {
    cartStore.addToCart(newItem)
    amount.value++
    toast.success('Product added to cart', {
      timeout: 3000,
      hideProgressBar: true,
      showCloseButtonOnHover: true
    })
  }
}

const isShow = ref(false)

watch(amount, (val) => {
  if (val > 0) isShow.value = true
  if (val === 0 || !val) isShow.value = false
})

const addAmount = (id) => {
  amount.value++
  cartStore.addAmount(id, amount)
}
const removeAmount = (id) => {
  amount.value--
  cartStore.deleteAmount(id, amount)
}
</script>

<template>
  <div class="flex items-center justify-start gap-20">
    <div
      class="relative h-screen basis-1/2 pb-20"
      v-motion
      :initial="{ opacity: 0, y: -300 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 1500, delay: 1200 } }"
    >
      <TheCarousel :gallery="data?.images" />
    </div>

    <div
      class="basis-1/2"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { duration: 1300, delay: 200 } }"
    >
      <BackArrowLink></BackArrowLink>
      <div class="mb-5 mt-8 text-gray-600">Category</div>
      <div v-hoverable class="text-4xl font-medium">{{ data?.name }}</div>

      <div class="my-10 mr-16 text-2xl text-gray-600">{{ data?.desc }}</div>
      <div class="text-2xl font-medium text-green-600">
        $ {{ data?.price }} (etc. VAT)
        <span class="text-2xl text-gray-600">| In stock: {{ data?.quantity }}</span>
      </div>
      <div class="mt-10 flex flex-row gap-6">
        <button
          v-hoverable
          class="border-2 border-black bg-black px-8 py-4 text-2xl font-medium text-white hover:border-gray-600 hover:bg-gray-600"
          @click="handleAddToCart(data)"
        >
          {{ isInCart(data) ? 'Remove from cart' : 'Add to cart' }}
        </button>
        <div
          v-if="isShow"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 1000 } }"
          :leave="{ opacity: 0, transition: { duration: 1000 } }"
          class="flex items-center justify-center text-3xl"
        >
          <div class="flex w-40 justify-between">
            <button class="little-btn" @click="removeAmount(data.id)" :disabled="amount < 2">
              -
            </button>
            <input v-model="amount" class="max-w-9 text-center" readonly />
            <button
              class="little-btn"
              @click="addAmount(data.id)"
              :disabled="amount >= 99 || amount >= data?.quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.little-btn {
  height: 2.5rem;
  width: 2.5rem;
  border-width: 2px;
  transition: background-color 0.4s ease;
}
.little-btn:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

.little-btn:disabled {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
</style>
