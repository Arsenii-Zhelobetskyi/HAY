<script setup>
import { onMounted, ref } from 'vue'
import { getCurrentUser } from '@/services/apiAuth.js'
import { getOrders } from '@/services/apiOrders.js'

const user = ref(null);
const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
  user.value = await getCurrentUser();

  if (user.value) {
    orders.value = await getOrders();
  }

  loading.value = false;
});
</script>

<template>
  <div class="container p-4 flex flex-col items-center ">
    <button @click="$emit('back')"
            v-hoverable
            v-motion="{
                enter: {  y: 0 },
                hovered: { y: -10}
              }">
      <span class="text-2xl">↑</span> Come back
    </button>
    <template v-if="!loading">
      <h2 class="text-2xl font-bold mb-4" v-if="orders.length > 0">Your Orders:</h2>
      <h2 class="text-2xl font-bold mb-4" v-else>No orders found.</h2>
      <ul class="space-y-3 search-results-container">
        <li v-for="order in orders" :key="order.id" class="flex items-center p-2 bg-white drop-shadow-md rounded-md">
          <img :src="order.images" alt="Product Image" class="w-24 h-24 ml-2 object-cover mr-2 rounded-md">
          <div>
            <div class="text-lg font-semibold -mt-1">{{ order.name }}</div>
            <div class="text-gray-600 mt-8">Total price: {{ order.total_price }}$</div>
          </div>
          <div class="ml-auto text-lg text-gray-700 mt-24">Quantity: {{ order.products_bought }}</div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div>Loading...</div>
    </template>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
.search-results-container {
  max-height: 600px;
  max-width: 1000px;
  min-width: 600px;
  overflow-y: auto;
}
</style>
