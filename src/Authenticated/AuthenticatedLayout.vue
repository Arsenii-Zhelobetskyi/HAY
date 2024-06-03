<script setup>
import TheHeader from '../ui/TheHeader.vue'
</script>

<template>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <TheHeader />
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
