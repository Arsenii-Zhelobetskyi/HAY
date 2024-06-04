<script setup>
import { ref, watchEffect } from 'vue'

import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import { useSignIn } from './useSignIn'
import { useMagicLink } from './useMagicLink'

import MainButton from '../../ui/MainButton.vue'

const router = useRouter()

const schema = toTypedSchema(
  z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6)
  })
)

const { errors, defineField, values, handleSubmit, resetForm, isSubmitting, validateField } =
  useForm({
    validationSchema: schema
  })

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
let submitted = false

const { signIn, signInIsPending, signInError } = useSignIn()
const { magicLink, magicLinkIsPending, magicLinkIsSuccess, magicLinkError } = useMagicLink()

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
}
</script>

<template>
  <form class="flex flex-col gap-8" @submit="onSubmit">
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
      v-if="!emailEntered.valid"
    >
      <input
        v-model="email"
        v-bind="emailAttrs"
        placeholder="test@example.com"
        class="border-2 border-gray-600 px-5 py-4 text-2xl"
      />
      <div v-if="submitted === true || emailEntered.errors" class="font-bold text-red-600">
        {{ errors.email }}
      </div>
      <MainButton type="button" additionalStyles="text-2xl font-normal" :function="showPass">
        Next
      </MainButton>
    </div>
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
      v-if="emailEntered.valid && !magicLinkIsSuccess && !magicLinkError && !magicLinkIsPending"
    >
      <input
        v-model="password"
        v-bind="passwordAttrs"
        placeholder="p@$$w0rd"
        class="border-2 border-gray-600 px-5 py-4 text-2xl"
        type="password"
      />
      <div v-if="submitted === true" class="font-bold text-red-600">{{ errors.password }}</div>

      <MainButton :disabled="isSubmitting" additionalStyles="text-2xl font-normal">
        {{ isSubmitting || signInIsPending ? 'Submitting...' : 'Submit' }}
      </MainButton>
      <div class="flex justify-between text-xl font-thin">
        <span class="hover:cursor-pointer hover:underline"> Forgot password ? </span>
        <span
          class="hover:cursor-pointer hover:underline"
          @click="
            () => {
              emailEntered.valid = false
            }
          "
        >
          Go back</span
        >
      </div>
      <div
        class="text-center text-2xl font-thin hover:cursor-pointer hover:underline"
        @click="magicLink(values.email)"
      >
        Use magic link
      </div>
    </div>
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
      class="text-center text-2xl"
      v-if="magicLinkIsSuccess || magicLinkError || magicLinkIsPending"
    >
      <div v-if="magicLinkIsPending" class="font-bold text-yellow-600">
        We are sending you a magic link
      </div>
      <div v-if="magicLinkIsSuccess" class="font-bold text-green-600">
        Magic link sent to your email
      </div>
      <div v-if="magicLinkError?.message" class="font-bold text-red-600">
        {{ magicLinkError?.message }}
      </div>
    </div>
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
