<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import { useSignIn } from './useSignIn'
import { useMagicLink } from './useMagicLink'

import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import MagicLink from './MagicLink.vue'
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

function onSuccess(values) {
  console.log('test')
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
}
function goBack() {
  //go back in password input
  emailEntered.value.valid = false
}
function handleMagicLink() {
  // so that we can pass it to PasswordInput
  magicLink(values.email)
}
</script>

<template>
  <form class="flex flex-col gap-8" @submit="onSubmit">
    <EmailInput
      v-if="!emailEntered.valid"
      :emailEntered="emailEntered"
      :submitted="submitted"
      name="email"
      :showPass="showPass"
    />
    <PasswordInput
      v-if="emailEntered.valid && !magicLinkIsSuccess && !magicLinkError && !magicLinkIsPending"
      :emailEntered="emailEntered"
      :submitted="submitted"
      name="password"
      :isSubmitting="isSubmitting"
      :signInIsPending="signInIsPending"
      :goBack="goBack"
      @use-magic-link="handleMagicLink"
    />
    <MagicLink
      v-if="magicLinkIsSuccess || magicLinkError || magicLinkIsPending"
      :magicLinkIsSuccess="magicLinkIsSuccess"
      :magicLinkError="magicLinkError"
      :magicLinkIsPending="magicLinkIsPending"
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
    >
      &#8212;
      <span class="hover:cursor-pointer hover:underline" @click="router.push('/sign-up')"
        >Sign up</span
      >
      &#8212;
    </div>
    <div if="signInError?.message" class="font-bold text-red-600">
      {{ signInError?.message }}
    </div>
  </form>
</template>
