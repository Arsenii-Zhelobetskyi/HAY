<script setup>
// import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import TheCursor from './ui/TheCursor.vue'
</script>

<template>
  <TheCursor />
  <RouterView />
  <div class="bg"></div>
  <VueQueryDevtools />
</template>
