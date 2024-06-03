<script setup>
import AboutItem from './AboutItem.vue'
import { useAboutStore } from '@/stores/about'
const aboutStore = useAboutStore()
</script>
<template>
  <div class="grid gap-6">
    <AboutItem v-for="aboutItem in aboutStore.about" :key="aboutItem.id" :item="aboutItem" />
  </div>
</template>
