<script setup>
 
import MainButton from '../../ui/MainButton.vue'
import MainInput from '../../ui/MainInput.vue'
const props = defineProps(['emailEntered', 'submitted', 'name', 'showPass'])
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
