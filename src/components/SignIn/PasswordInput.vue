<script setup>
import { useField } from 'vee-validate'
import MainButton from '../../ui/MainButton.vue'
import MainInput from '@/ui/MainInput.vue'
import { watch, ref } from 'vue'

const props = defineProps([
  'submitted',
  'name',
  'isSubmitting',
  'signInIsPending',
  'goMagicLink',
  'email',
  'goResetPassword',
  'setStep'
])

const { valueEmail } = useField(() => 'email')

const email = ref(props.email)
watch(
  () => props.email,
  (newValue, oldValue) => {
    email.value = newValue
  },
  { immediate: true }
)

function handlePasswordReset() {
  props.goResetPassword(email.value)
  props.setStep('PasswordReset')
}
function handleMagicLink(email) {
  props.goMagicLink(email)
  props.setStep('MagicLink')
}
function handleGoBack() {
  props.setStep('Email')
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
  >
    <MainInput
      :name="name"
      placeholder="p@$$w0rd"
      type="password"
      :hasErrors="submitted === true"
    />
    <MainButton :disabled="isSubmitting" additionalStyles="text-2xl font-normal">
      {{ isSubmitting || signInIsPending ? 'Submitting...' : 'Submit' }}
    </MainButton>
    <div class="flex justify-between text-xl font-thin">
      <span class="hover:cursor-pointer hover:underline" @click="handlePasswordReset">
        Forgot password ?
      </span>
      <span class="hover:cursor-pointer hover:underline" @click="handleGoBack"> Go back</span>
    </div>
    <div
      class="text-center text-2xl font-thin hover:cursor-pointer hover:underline"
      @click="handleMagicLink(email)"
    >
      Use magic link
    </div>
  </div>
</template>
