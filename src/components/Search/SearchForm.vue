<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fullTextSearch } from '@/services/apiSearch.js'
import { useMotion } from '@vueuse/motion'

const router = useRouter();
const searchResults = ref([]);
const searchQuery = ref('');

function goToProduct(productId) {
  router.push(`/product/${productId}`);
}

watch(searchQuery, async (newValue, oldValue) => {
  if (newValue.trim() !== '') {
    try {
      const newData = await fullTextSearch(newValue);
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
    </div>

    <div class="w-full max-w-xl mt-8">
      <ul>
        <li
          v-for="result in searchResults"
          :key="result.id"
          class="flex items-center p-4 mb-2 bg-white drop-shadow-lg rounded-md"
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

