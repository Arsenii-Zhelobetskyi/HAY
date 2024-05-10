<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { getCurrentUser } from '../services/apiAuth'
import { useQueryClient } from '@tanstack/vue-query'
const queryClient = useQueryClient()
router.beforeEach(async (to, from) => {
  // get current user info
  const data = await queryClient.fetchQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })
  if (!data && to.name !== 'not-found') {
    return {
      name: 'not-found'
    }
  }
  if (!data?.role === 'authenticated' && to.name !== 'not-found') {
    return {
      name: 'not-found'
    }
  }
})
</script>

<template>
  <slot></slot>
</template>
