<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fullTextSearch } from '@/services/apiSearch.js'
import { getCategories, getMaxPrice } from '@/services/apiProducts.js'

const router = useRouter()
const searchResults = ref([])
const searchQuery = ref('')
const categories = ref([])
const selectedCategory = ref(null)

const maxPrice = ref(null)
const selectedMaxPrice = ref(0)

watch(selectedMaxPrice, () => {})

async function fetchData() {
  try {
    categories.value = await getCategories()
    const maxValues = await getMaxPrice()
    maxPrice.value = maxValues[0].price
    selectedMaxPrice.value = maxPrice.value
  } catch (error) {
    console.error('error', error)
  }
}

fetchData()

function goToProduct(productId) {
  router.push(`/product/${productId}`)
}

function validateMaxPrice(value) {
  if (value > maxPrice.value) {
    selectedMaxPrice.value = maxPrice.value
  }
}

watch(
  [searchQuery, selectedCategory, selectedMaxPrice],
  async ([newSearchQuery, newSelectedCategory, newSelectedMaxPrice]) => {
    if (newSearchQuery.trim() !== '') {
      try {
        const newData = await fullTextSearch(
          newSearchQuery,
          newSelectedCategory,
          newSelectedMaxPrice
        )
        searchResults.value = newData
      } catch (error) {
        console.error('error', error)
      }
    } else {
      searchResults.value = []
    }
  }
)
</script>

<template>
  <div class="flex min-h-screen flex-col items-center">
    <div class="mt-8 w-full max-w-3xl p-4">
      <input
        v-model="searchQuery"
        placeholder="enter product name."
        class="w-full rounded-full border-2 px-4 py-2"
      />
      <div class="flex w-full items-center space-x-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id === selectedCategory ? null : category.id"
          :class="{
            'bg-gray-800 text-white': selectedCategory === category.id,
            'bg-gray-200': selectedCategory !== category.id
          }"
          class="h-12 w-48 rounded-full px-4 py-2 text-base font-semibold focus:outline-none"
          v-motion="{
            enter: { scale: 1 },
            hovered: { scale: 1.1 }
          }"
        >
          {{ category.name }}
        </button>
        <div class="mb-4 w-full pl-4 pt-5">
          <div class="flex items-center justify-between">
            <label for="max-price-range" class="block text-sm font-bold text-gray-700">
              Max Price:
            </label>
            <input
              type="number"
              v-model="selectedMaxPrice"
              min="0"
              :max="maxPrice"
              @input="validateMaxPrice($event.target.value)"
              class="w-20 rounded p-1 text-center text-sm"
            />
          </div>
          <input
            type="range"
            id="max-price-range"
            class="w-full accent-black"
            min="0"
            :max="maxPrice"
            v-model="selectedMaxPrice"
          />
        </div>
      </div>
    </div>

    <div class="search-results-container w-full max-w-xl pb-20">
      <ul>
        <li
          v-for="(result, index) in searchResults"
          :key="result.id"
          class="mb-2 flex h-32 cursor-pointer items-center rounded-md bg-white p-4 drop-shadow-md"
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0, transition: { delay: index * 300, duration: 800 } },
            leave: { opacity: 0, y: 0, transition: { duration: 600 } }
          }"
          @click="goToProduct(result.product_id)"
        >
          <img
            v-if="result.image"
            :src="result.image"
            alt="product img"
            class="mr-4 h-20 w-20 rounded-md"
          />
          <span class="w-full text-xl">{{ result.name }}</span>
          <span class="price-span mr-6 text-lg text-gray-500"> {{ result.price }}$ </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.search-results-container {
  max-height: 480px;
  max-width: 800px;
  overflow-y: auto;
}

li .price-span {
  opacity: 0;
  transition: opacity 500ms;
}

li:hover .price-span {
  opacity: 1;
}
</style>
