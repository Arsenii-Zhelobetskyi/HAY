<script setup>
import { ref } from 'vue'

import MainButton from '../../ui/MainButton.vue'
import MainInput from '../../ui/MainInput.vue'
const props = defineProps(['emailEntered', 'submitted', 'name', 'showPass'])

// Ref for the MainInput component
const mainInputRef = ref(null)

// Method to handle the "Enter" key press
function onEnterPress(event) {
  if (event.key === 'Enter') {
    props.showPass()
  }
}
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
    ref="mainInputRef"
    @keydown="onEnterPress"
  >
    <MainInput
      :name="name"
      placeholder="test@example.com"
      :hasErrors="submitted === true || emailEntered.errors"
    />
    <MainButton type="button" additionalStyles="text-2xl font-normal" :function="showPass">
      Next
    </MainButton>
  </div>
</template>
