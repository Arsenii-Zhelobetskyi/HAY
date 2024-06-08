<script setup>
import SearchForm from '@/components/Search/SearchForm.vue'
import BackArrowLink from '../ui/BackArrowLink.vue'
</script>

<template>
  <main class="font-normal">
    <BackArrowLink class="absolute left-0 top-0 z-10 ml-4 mt-4"></BackArrowLink>
    <SearchForm />
  </main>
</template>
