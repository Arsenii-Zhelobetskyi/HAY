<script setup>
import { getGoogleData } from '@/services/apiAuth'
function handleSubmit() {
  getGoogleData()
}
</script>
<template>
  <button
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
    v-hoverable
    type="button"
    @click="handleSubmit"
    :class="`flex items-center  border-4 border-black bg-black px-8 py-4 text-2xl font-normal text-white hover:border-gray-600 hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50  `"
  >
    <img
      class="mr-10 h-10 max-w-10"
      src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
      alt="Google logo"
    />
    <span>Sign in with Google</span>
  </button>
</template>
