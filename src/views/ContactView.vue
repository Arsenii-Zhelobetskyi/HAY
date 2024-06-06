<script setup>
import ContactAside from '../components/Contact/ContactAside.vue'
import TheContact from '../components/Contact/TheContact.vue'
import { useSearchStores } from '@/components/Contact/useSearchStores'

const { searchStores, searchStoresIsSuccess, searchStoresIsPending, searchStoresError } =
  useSearchStores()
// searchStores is a function that finds the stores
</script>

<template>
  <main class="grid grid-cols-4 font-normal">
    <aside class="col-span-2">
      <ContactAside
        :searchStoresIsSuccess="searchStoresIsSuccess"
        :searchStoresIsPending="searchStoresIsPending"
        :searchStoresError="searchStoresError"
      />
    </aside>
    <section class="col-span-2 px-6 pb-20 pt-8">
      <TheContact
        :searchStores="searchStores"
        :searchStoresIsSuccess="searchStoresIsSuccess"
        :searchStoresIsPending="searchStoresIsPending"
        :searchStoresError="searchStoresError"
      />
    </section>
  </main>
</template>
