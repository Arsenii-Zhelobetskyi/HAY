<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useSignUp } from './useSignUp'
import { useRouter } from 'vue-router'

import MainInput from '@/ui/MainInput.vue'
import MainButton from '@/ui/MainButton.vue'

const router = useRouter()

const schema = toTypedSchema(
  z
    .object({
      email: z.string().min(1).email(),
      password: z.string().min(6),
      repeatPassword: z.string().min(6)
    })
    .partial()
    .refine((data) => data.password === data.repeatPassword, {
      message: 'Passwords do not match',
      path: ['repeatPassword']
    })
)

const { handleSubmit, resetForm, isSubmitting, setFieldError } = useForm({
  validationSchema: schema
})

let submitted = false

const { signUp, signUpIsPending, signUpError } = useSignUp()
function onSuccess(values) {
  if (!values.email) {
    setFieldError('email', 'Email is required')
  }
  signUp({ email: values.email, password: values.password })
  resetForm()
  submitted = false
  console.log(values)
}
function onInvalidSubmit(values) {
  if (!values.email) {
    setFieldError('email', 'Email is required or you have entered a wrong email')
  }
  submitted = true
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)
</script>
<template>
  <form class="flex flex-col gap-8" @submit="onSubmit">
    <MainInput name="email" placeholder="test@example.com" :hasErrors="submitted === true" />
    <MainInput
      name="password"
      placeholder="p@$$w0rd"
      type="password"
      :hasErrors="submitted === true"
    />
    <MainInput
      name="repeatPassword"
      placeholder="repeat p@$$w0rd"
      type="password"
      :hasErrors="submitted === true"
    />

    <MainButton :disabled="isSubmitting" additionalStyles="text-2xl font-normal">
      {{ isSubmitting || signUpIsPending ? 'Submitting...' : 'Submit' }}
    </MainButton>
    <div class="text-center text-2xl font-thin">
      &#8212;
      <span class="hover:cursor-pointer hover:underline" @click="router.push('/sign-in')"
        >Sign in</span
      >
      &#8212;
    </div>
    <div if="signInError?.message" class="font-bold text-red-600">
      {{ signUpError?.message }}
    </div>
  </form>
</template>
