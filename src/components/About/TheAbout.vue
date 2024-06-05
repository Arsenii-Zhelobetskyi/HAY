<script setup>
import AboutItem from './AboutItem.vue'

import { useAboutStore } from '@/stores/about'
const aboutStore = useAboutStore()

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    })
  })
})
</script>
<template>
  <div class="grid snap-y snap-mandatory gap-6 scroll-smooth">
    <AboutItem v-for="aboutItem in aboutStore.about" :key="aboutItem.id" :item="aboutItem" />
  </div>
</template>
