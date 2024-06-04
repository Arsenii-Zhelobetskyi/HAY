<script setup>
import { useField } from 'vee-validate'
import MainButton from '../../ui/MainButton.vue'

const props = defineProps([
  'emailEntered',
  'submitted',
  'name',
  'isSubmitting',
  'signInIsPending',
  'goBack',
  'goMagicLink'
])
const { value, errorMessage } = useField(() => props.name)
const { valueEmail } = useField(() => 'email')

const emit = defineEmits(['use-magic-link'])
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
      placeholder="p@$$w0rd"
      class="border-2 border-gray-600 px-5 py-4 text-2xl"
      type="password"
    />
    <div v-if="submitted === true" class="font-bold text-red-600">{{ errorMessage }}</div>

    <MainButton :disabled="isSubmitting" additionalStyles="text-2xl font-normal">
      {{ isSubmitting || signInIsPending ? 'Submitting...' : 'Submit' }}
    </MainButton>
    <div class="flex justify-between text-xl font-thin">
      <span class="hover:cursor-pointer hover:underline"> Forgot password ? </span>
      <span class="hover:cursor-pointer hover:underline" @click="goBack"> Go back</span>
    </div>
    <div
      class="text-center text-2xl font-thin hover:cursor-pointer hover:underline"
      @click="emit('use-magic-link')"
    >
      Use magic link
    </div>
  </div>
</template>
