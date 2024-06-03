<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentUser } from '@/services/apiAuth.js'
import UserSettings from '@/components/Profile/UserSettings.vue'
const user = ref(null);
const loading = ref(true);

const showWelcomeUser = ref(true);

const goToSettings = () => {
  showWelcomeUser.value = false;
};

onMounted(async () => {
  user.value = await getCurrentUser();
  loading.value = false;
})
</script>

<template>
  <div v-if="showWelcomeUser">
  <div v-if="loading" class="text-2xl">
  </div>
  <div v-else-if="user" class="text-2xl animate-slide-in">
    Welcome back, {{ user.email }} !
    <button @click="goToSettings">
      <span class="text-4xl">→</span>
    </button>
  </div>
  </div>
  <UserSettings v-else />
</template>

<style scoped>
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 1s ease-out;
  animation-fill-mode: forwards;
}
</style>