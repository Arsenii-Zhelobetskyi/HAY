<script setup>
import { ref, onMounted } from 'vue'
import { useField } from 'vee-validate'
const props = defineProps(['name', 'placeholder', 'hasErrors', 'type'])
const { value, errorMessage } = useField(() => props.name)

// Ref for the MainInput component
const mainInputRef = ref(null)

// Set focus on the input when the component is mounted
onMounted(() => {
  mainInputRef.value?.focus()
})
</script>
<template>
  <input
    v-model="value"
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
    :placeholder="placeholder"
    class="border-2 border-gray-600 px-5 py-4 text-2xl"
    :type="type"
    ref="mainInputRef"
  />
  <div v-if="hasErrors" class="font-bold text-red-600">
    {{ errorMessage }}
  </div>
</template>
