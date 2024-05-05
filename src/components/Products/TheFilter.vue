<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps(['value', 'filterField'])

function setFilter(filterField, value) {
  const currentQuery = router.currentRoute.value.query

  let query = { ...currentQuery, [filterField]: value }

  if (currentQuery.page) {
    query = { ...query, page: 1 }
  }
  router.push({ query: query })
}
</script>

<template>
  <div
    class="cursor-pointer text-2xl font-light hover:font-medium hover:underline"
    @click="setFilter(filterField, value)"
  >
    <slot></slot>
  </div>
</template>
