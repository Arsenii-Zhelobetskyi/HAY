<script setup>
defineProps(['magicLinkIsSuccess', 'magicLinkError', 'magicLinkIsPending'])
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
    <div v-if="magicLinkIsPending" class="font-bold text-yellow-600">
      We are sending you a magic link
    </div>
    <div v-if="magicLinkIsSuccess" class="font-bold text-green-600">
      Magic link sent to your email
    </div>
    <div v-if="magicLinkError?.message" class="font-bold text-red-600">
      {{ magicLinkError?.message }}
    </div>
  </div>
</template>
