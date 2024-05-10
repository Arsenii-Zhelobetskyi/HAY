<script setup>
import TheHeader from './ui/TheHeader.vue'
import ProtectedRoute from './ui/ProtectedRoute.vue'
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { getCurrentUser, signIn } from './services/apiAuth'
import { useQuery } from '@tanstack/vue-query'
</script>

<template>
  <ProtectedRoute>
    <RouterView />
    <TheHeader />
  </ProtectedRoute>
  <VueQueryDevtools />
</template>
