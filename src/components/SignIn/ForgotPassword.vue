<script setup>
defineProps(['sendPasswordResetIsSuccess', 'sendPasswordResetIsPending', 'sendPasswordResetError'])
</script>
<template>
  <div
    v-motion="{
      initial: {
        y: 100,
        opacity: 0
      },
      enter: {
        y: 0,
        opacity: 1
      }
    }"
    class="text-center text-2xl"
  >
    <div v-if="sendPasswordResetIsPending" class="font-bold text-yellow-600">
      We are sending you a reset password link
    </div>
    <div v-if="sendPasswordResetIsSuccess" class="font-bold text-green-600">
      Reset password link sent to your email
    </div>
    <div v-if="sendPasswordResetError?.message" class="font-bold text-red-600">
      {{ sendPasswordResetError?.message }}
    </div>
  </div>
</template>
