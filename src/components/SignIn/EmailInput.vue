<script setup>
import { useField } from 'vee-validate'
import MainButton from '../../ui/MainButton.vue'

const props = defineProps(['emailEntered', 'submitted', 'name', 'showPass'])
const { value, errorMessage } = useField(() => props.name)
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
    class="flex flex-col gap-8"
  >
    <input
      v-model="value"
      placeholder="test@example.com"
      class="border-2 border-gray-600 px-5 py-4 text-2xl"
    />
    <div v-if="submitted === true || emailEntered.errors" class="font-bold text-red-600">
      {{ errorMessage }}
    </div>
    <MainButton type="button" additionalStyles="text-2xl font-normal" :function="showPass">
      Next
    </MainButton>
  </div>
</template>
