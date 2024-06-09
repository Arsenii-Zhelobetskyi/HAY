<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  if (window.history.length > 2) {
    router.go(-1)
  } else {
    router.push(1)
  }
}
</script>

<template>
  <div
    v-motion
    :initial="{ scale: 1 }"
    :hovered="{ scale: 1.2, transition: { duration: 500 } }"
    v-hoverable
    class="mb-10 block max-w-10 cursor-none"
    @click="goBack()"
  >
    <svg
      class="max-w-10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill="currentColor"
    >
      <path
        d="M22 12a1 1 0 0 1-1 1H5.41l4.3 4.3a1 1 0 1 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.42 1.4L5.41 11H21a1 1 0 0 1 1 1z"
      />
    </svg>
  </div>
</template>
