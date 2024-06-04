<script setup>
import { useField } from 'vee-validate'
const props = defineProps(['name', 'placeholder', 'hasErrors', 'type'])
const { value, errorMessage } = useField(() => props.name)
</script>
<template>
  <input
    v-model="value"
    :placeholder="placeholder"
    class="border-2 border-gray-600 px-5 py-4 text-2xl"
    :type="type"
  />
  <div v-if="hasErrors" class="font-bold text-red-600">
    {{ errorMessage }}
  </div>
</template>
