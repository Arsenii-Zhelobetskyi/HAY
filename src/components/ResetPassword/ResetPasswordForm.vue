<script setup>
import MainInput from '@/ui/MainInput.vue'
import MainButton from '@/ui/MainButton.vue'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'

import { useUpdatePassword } from './useUpdatePassword.'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

//check if user entered via reset link
onBeforeMount(() => {
  const route = useRoute()
  const router = useRouter()
  const hash = route.hash.substring(1)
  if (!hash) {
    router.push('/')
  }
})

const schema = toTypedSchema(
  z
    .object({
      password: z.string().min(6),
      repeatPassword: z.string().min(6)
    })
    .partial()
    .refine((data) => data.password === data.repeatPassword, {
      message: 'Passwords do not match',
      path: ['repeatPassword']
    })
)

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: schema
})

const { updatePassword, updatePasswordIsPending, updatePasswordError } = useUpdatePassword()
let submitted = false

function onSuccess(values) {
  updatePassword(values.password)
  resetForm()
  submitted = false
}
function onInvalidSubmit() {
  submitted = true
}
const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)
</script>

<template>
  <form class="flex flex-col gap-8" @submit="onSubmit">
    <MainInput
      name="password"
      placeholder="new p@$$w0rd"
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
      {{ isSubmitting || updatePasswordIsPending ? 'Submitting...' : 'Submit' }}
    </MainButton>
    <div if="updatePasswordError?.message" class="font-bold text-red-600">
      {{ updatePasswordError?.message }}
    </div>
  </form>
</template>
