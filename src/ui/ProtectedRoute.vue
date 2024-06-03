<script setup>
import { useRouter } from 'vue-router'
import { getCurrentUser } from '../services/apiAuth'
import { useQueryClient } from '@tanstack/vue-query'
const router = useRouter()
const queryClient = useQueryClient()
router.beforeEach(async (to, from) => {
  // get current user info
  const data = await queryClient.fetchQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })
  console.log()
  if (!data && to.name !== 'sign-in' && to.name !== 'sign-up') {
    return {
      name: 'sign-in'
    }
  }
  if (!data?.role === 'authenticated' && to.name !== 'sign-in' && to.name !== 'sign-up') {
    return {
      name: 'sign-in'
    }
  }
})
</script>

<template>
  <router-view />
</template>
