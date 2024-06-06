<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useGeo } from '@/components/Contact/useGeo'
import { useQueryClient } from '@tanstack/vue-query'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'

import MainInput from '@/ui/MainInput.vue'
import Results from './Results.vue'
import ContactInfo from './ContactInfo.vue'

const props = defineProps([
  'searchStores',
  'searchStoresIsSuccess',
  'searchStoresIsPending',
  'searchStoresError'
])

const queryClient = useQueryClient()

const schema = toTypedSchema(
  z.object({
    searchQuery: z.string().min(1)
  })
)

const { values, setFieldValue, meta } = useForm({
  validationSchema: schema
})
const { getLocationIsSuccess } = useGeo()
const currentPage = ref(1)

function updatePage(value) {
  currentPage.value = value
}

watchEffect(() => {
  //to use your location to find store
  if (getLocationIsSuccess.value) {
    const country = queryClient.getQueryData(['location'])?.country?.name
    if (country) setFieldValue('searchQuery', country)
  }
})

function submit() {
  props.searchStores({ searchQuery: values.searchQuery })
  currentPage.value = 1
}

// delay search until user stops typing

const debounceTimeout = ref(null)

watch(
  () => values.searchQuery,
  (newQuery) => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value)
    }
    debounceTimeout.value = setTimeout(() => {
      submit()
    }, 500)
  }
)
</script>
<template>
  <div class="grid grid-cols-2">
    <div class="flex h-[88vh] flex-col gap-10">
      <h1
        class="text-5xl font-medium"
        v-hoverable
        v-motion
        :initial="{
          y: -100,
          opacity: 0
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 250,
            damping: 25,
            mass: 0.5
          }
        }"
      >
        Got any questions? <br />
        Contact us! <br />
        Or look out for our store.
      </h1>
      <MainInput name="searchQuery" placeholder="Search for our St0rE" />

      <Results
        :currentPage="currentPage"
        :searchStores="searchStores"
        :searchQuery="values.searchQuery"
        :searchStoresIsSuccess="searchStoresIsSuccess"
        :searchStoresIsPending="searchStoresIsPending"
        :searchStoresError="searchStoresError"
        :updatePage="updatePage"
        :dirty="meta.dirty"
      />
    </div>
    <div class="text-right">
      <ContactInfo />
    </div>
  </div>
</template>
