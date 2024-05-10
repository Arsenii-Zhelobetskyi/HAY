<script setup>
// import { useQuery } from '@tanstack/vue-query'
// import { signIn } from '@/services/apiAuth'
import { useRouter } from 'vue-router'
const router = useRouter()
// const {
//   isPending: isPendingSignIn,
//   fetchStatus: fetchStatusSignIn,
//   data: userSignIn
// } = useQuery({
//   queryKey: ['signIn'],
//   queryFn: signIn('zhelobetskyi@proton.me', 'zhelobetskyi@proton.me')
// })
import { getCurrentUser } from '../services/apiAuth'
import { QueryClient } from '@tanstack/vue-query'
const queryClient = new QueryClient()
router.beforeEach(async (to, from) => {
  // get current user info
  const data = await queryClient.fetchQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })
  console.log(data)
  console.log('currentUser', data?.role)

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
