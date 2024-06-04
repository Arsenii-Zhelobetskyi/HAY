<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentUser, logout, updateUser } from '@/services/apiAuth.js'
import { getOrders } from '@/services/apiOrders.js'

const user = ref(null);
const orders = ref([]);
const loading = ref(true);
const showSettings = ref(false);
const newEmail = ref('');
const newPassword = ref('');

const handleLogout = async () => {
  await logout();
  location.reload();
};

const updateUserSettings = async () => {
  try {
    const updatedUser = await updateUser({ email: newEmail.value, password: newPassword.value });

    user.value = updatedUser;
    showSettings.value = false;
    location.reload();
  } catch (error) {
    console.error(error.message);
  }
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

const reloadPage = () => {
  location.reload();
};

onMounted(async () => {
  user.value = await getCurrentUser();

  if (user.value) {
    orders.value = await getOrders();
  }

  loading.value = false;
});
</script>

<template>
  <!--todo clean-->
  <div class="animate-slide-in text-2xl">
    <div v-if="loading">
    </div>
    <div v-else-if="user" class="font-thin">
      <button @click="reloadPage">
        <span class="text-2xl ">↑</span>Come back
      </button>
      <div>
        Your email: {{ user.email }}
        <div>
          <button @click="toggleSettings" class="text-blue-500 hover:underline">Settings</button>
          <button @click="handleLogout" class="text-red-500 ml-60 hover:underline">Logout</button>
        </div>
      </div>
      <div v-if="showSettings">
        <form @submit.prevent="updateUserSettings" class="grid">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="newEmail" class="border border-gray-400" required>
          <label for="password">New Password:</label>
          <input type="password" id="password" v-model="newPassword" class="border border-gray-400" required>
          <button class="hover:underline" type="submit">Save Changes</button>
          <button class="hover:underline" type="button" @click="toggleSettings">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>