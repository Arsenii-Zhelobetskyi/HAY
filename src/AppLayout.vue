<script setup>
import TheHeader from './ui/TheHeader.vue'
import ProtectedRoute from './ui/ProtectedRoute.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <ProtectedRoute>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <TheHeader />
  </ProtectedRoute>
</template>

<style>
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active {
  transition: opacity 0.4s ease-out;
}

.route-leave-active {
  transition: opacity 0.4s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>
