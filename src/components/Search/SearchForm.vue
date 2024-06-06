<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fullTextSearch } from '@/services/apiSearch.js'
import { getCategories } from '@/services/apiProducts.js'
import { useMotion } from '@vueuse/motion'

const router = useRouter();
const searchResults = ref([]);
const searchQuery = ref('');
const categories = ref([]);
const selectedCategory = ref(null);

async function fetchData() {
  try {
    categories.value = await getCategories();
  } catch (error) {
    console.error("error", error);
  }
}

fetchData();

function goToProduct(productId) {
  router.push(`/product/${productId}`);
}

watch([searchQuery, selectedCategory], async ([newSearchQuery, newSelectedCategory], [oldSearchQuery, oldSelectedCategory]) => {
  if (newSearchQuery.trim() !== '') {
    try {
      const newData = await fullTextSearch(newSearchQuery, newSelectedCategory);
      searchResults.value = newData;
    } catch (error) {
      console.error("error", error);
    }
  } else {
    searchResults.value = [];
  }
});
</script>



<template>
  <div class="flex flex-col items-center min-h-screen">
    <div class="w-full max-w-xl p-4 mt-8">
      <input v-model="searchQuery" placeholder="enter product name." class="p-2 border-2 rounded-full mb-2 w-full" />
      <div class="flex justify-center space-x-4 mb-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id === selectedCategory ? null : category.id"
          :class="{ 'bg-gray-800 text-white': selectedCategory === category.id, 'bg-gray-200': selectedCategory !== category.id }"
          class="px-4 py-2 rounded-full text-sm font-semibold focus:outline-none"
          v-motion="{
            enter: { scale: 1},
            hovered: { scale: 1.2}
          }"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <div class="w-full max-w-xl mt-8 search-results-container">
      <ul>
        <li
          v-for="result in searchResults"
          :key="result.id"
          class="flex h-20 items-center p-4 mb-2 bg-white drop-shadow-md rounded-md cursor-pointer"
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0 }
          }"
          @click="goToProduct(result.product_id)"
        >
          <img v-if="result.image" :src="result.image" alt="product img" class="w-8 h-8 mr-2" />
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>


<style>
.search-results-container {
  max-height: 600px;
  max-width: 800px;
  overflow-y: auto;
}
</style>