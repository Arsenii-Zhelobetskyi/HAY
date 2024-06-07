<script setup>
const props = defineProps(['function', 'disabled', 'additionalStyles'])
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
    @click="props.function"
    :disabled="props.disabled"
    :class="`border-4 border-black bg-black px-20 py-4 font-bold text-white hover:border-gray-600 hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 ${props.additionalStyles}`"
  >
    <slot></slot>
  </button>
</template>
