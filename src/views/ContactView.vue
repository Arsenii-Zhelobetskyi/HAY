<script setup>
import ContactAside from '../components/Contact/ContactAside.vue'
import TheContact from '../components/Contact/TheContact.vue'
</script>

<template>
  <main class="grid grid-cols-4 font-normal">
    <aside class="col-span-2">
      <ContactAside />
    </aside>
    <section class="col-span-2 px-6 pb-20 pt-8">
      <TheContact />
    </section>
  </main>
</template>
