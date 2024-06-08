<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fullTextSearch } from '@/services/apiSearch.js'
import { getCategories } from '@/services/apiProducts.js'
import { useMotion } from '@vueuse/motion'

const router = useRouter()
const searchResults = ref([])
const searchQuery = ref('')
const categories = ref([])
const selectedCategory = ref(null)

async function fetchData() {
  try {
    categories.value = await getCategories()
  } catch (error) {
    console.error('error', error)
  }
}

fetchData()

function goToProduct(productId) {
  router.push(`/product/${productId}`)
}

watch(
  [searchQuery, selectedCategory],
  async ([newSearchQuery, newSelectedCategory], [oldSearchQuery, oldSelectedCategory]) => {
    if (newSearchQuery.trim() !== '') {
      try {
        const newData = await fullTextSearch(newSearchQuery, newSelectedCategory)
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
    <div class="mt-8 w-full max-w-xl p-4">
      <input
        v-model="searchQuery"
        placeholder="enter product name."
        class="mb-2 w-full rounded-full border-2 p-2"
      />
      <div class="mb-4 flex justify-center space-x-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id === selectedCategory ? null : category.id"
          :class="{
            'bg-gray-800 text-white': selectedCategory === category.id,
            'bg-gray-200': selectedCategory !== category.id
          }"
          class="rounded-full px-4 py-2 text-sm font-semibold focus:outline-none"
          v-motion="{
            enter: { scale: 1 },
            hovered: { scale: 1.2 }
          }"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <div class="search-results-container mt-2 w-full max-w-xl">
      <ul>
        <li
          v-for="result in searchResults"
          :key="result.id"
          class="mb-2 flex h-20 cursor-pointer items-center rounded-md bg-white p-4 drop-shadow-md"
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0 }
          }"
          @click="goToProduct(result.product_id)"
        >
          <img v-if="result.image" :src="result.image" alt="product img" class="mr-2 h-8 w-8" />
          {{ result.name }}
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
</style>
