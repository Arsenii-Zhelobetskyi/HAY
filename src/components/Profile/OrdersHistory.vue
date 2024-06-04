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
    console.log(orders);
  }

  loading.value = false;
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Your Orders:</h2>
    <ul class="space-y-3">
      <li v-for="order in orders" :key="order.id" class="flex items-center p-4 bg-white shadow-md rounded-lg">
        <img :src="order.images" alt="Product Image" class="w-36 h-36 object-cover mr-4">
        <div>
          <div class="text-lg font-semibold -mt-1">{{ order.name }}</div>
          <div class="text-gray-500 mt-16">Total price: {{ order.total_price }}</div>
        </div>
        <div class="ml-auto text-lg text-gray-700 mt-36">Quantity: {{ order.products_bought }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
