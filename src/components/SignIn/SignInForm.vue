<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import { useSignIn } from './useSignIn'
import { useMagicLink } from './useMagicLink'
import { useSendPasswordReset } from './useSendPasswordReset'

import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import MagicLink from './MagicLink.vue'
import ForgotPassword from './ForgotPassword.vue'
const router = useRouter()

const schema = toTypedSchema(
  z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6)
  })
)

const { values, handleSubmit, resetForm, isSubmitting, validateField } = useForm({
  validationSchema: schema
})

let submitted = false // show error only if submitted

const { signIn, signInIsPending, signInError } = useSignIn()
const { magicLink, magicLinkIsPending, magicLinkIsSuccess, magicLinkError } = useMagicLink()
const {
  sendPasswordReset,
  sendPasswordResetIsPending,
  sendPasswordResetIsSuccess,
  sendPasswordResetError
} = useSendPasswordReset()

function onSuccess(values) {
  signIn({ email: values.email, password: values.password })
  resetForm()
  submitted = false
}

function onInvalidSubmit() {
  submitted = true
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)

// progressive disclosure
const emailEntered = ref(false)
async function showPass() {
  emailEntered.value = await validateField('email')
  if (emailEntered.value.valid) {
    setStep('Password')
  }
}
const step = ref('Email')
function setStep(value) {
  step.value = value
}
</script>

<template>
  <form class="flex flex-col gap-8" @submit="onSubmit">
    <EmailInput
      v-if="!emailEntered.valid || (emailEntered.valid && step === 'Email')"
      :emailEntered="emailEntered"
      :submitted="submitted"
      name="email"
      :showPass="showPass"
    />
    <PasswordInput
      v-if="emailEntered.valid && step === 'Password'"
      :submitted="submitted"
      name="password"
      :isSubmitting="isSubmitting"
      :signInIsPending="signInIsPending"
      :email="values.email"
      :goMagicLink="magicLink"
      :goResetPassword="sendPasswordReset"
      :setStep="setStep"
    />
    <MagicLink
      v-if="step === 'MagicLink'"
      :magicLinkIsSuccess="magicLinkIsSuccess"
      :magicLinkIsPending="magicLinkIsPending"
      :magicLinkError="magicLinkError"
    />
    <ForgotPassword
      v-if="step === 'PasswordReset'"
      :sendPasswordResetIsSuccess="sendPasswordResetIsSuccess"
      :sendPasswordResetIsPending="sendPasswordResetIsPending"
      :sendPasswordResetError="sendPasswordResetError"
    />
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
      class="text-center text-2xl font-thin"
      v-if="!magicLinkIsSuccess && !magicLinkError && !magicLinkIsPending"
      v-hoverable
    >
      &#8212;
      <span class="hover:underline" @click="router.push('/sign-up')">Sign up</span>
      &#8212;
    </div>
    <div if="signInError?.message" class="font-bold text-red-600">
      {{ signInError?.message }}
    </div>
  </form>
</template>
