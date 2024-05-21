<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useSignUp } from './useSignUp'
import { useRouter } from 'vue-router'
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

const { errors, values, defineField, handleSubmit, resetForm, isSubmitting, setFieldError } =
  useForm({
    validationSchema: schema
  })

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [repeatPassword, repeatPasswordAttrs] = defineField('repeatPassword')
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
    <input
      v-model="email"
      v-bind="emailAttrs"
      placeholder="test@example.com"
      class="border-2 border-gray-600 px-5 py-4 text-2xl"
    />
    <div v-if="submitted === true" class="font-bold text-red-600">{{ errors.email }}</div>
    <input
      v-model="password"
      v-bind="passwordAttrs"
      placeholder="p@$$w0rd"
      class="border-2 border-gray-600 px-5 py-4 text-2xl"
      type="password"
    />
    <div v-if="submitted === true" class="font-bold text-red-600">{{ errors.password }}</div>
    <input
      v-model="repeatPassword"
      v-bind="repeatPasswordAttrs"
      placeholder="repeat p@$$w0rd"
      class="border-2 border-gray-600 px-5 py-4 text-2xl"
      type="password"
    />
    <div v-if="submitted === true" class="font-bold text-red-600">{{ errors.repeatPassword }}</div>
    <button
      :disabled="isSubmitting"
      class="border-4 border-black bg-black px-20 py-4 text-2xl text-white hover:border-gray-600 hover:bg-gray-600"
    >
      {{ isSubmitting || signUpIsPending ? 'Submitting...' : 'Submit' }}
    </button>
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
