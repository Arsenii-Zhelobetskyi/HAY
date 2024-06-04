<script setup>
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <RouterView />
  <div class="bg"></div>
  <VueQueryDevtools />
</template>
