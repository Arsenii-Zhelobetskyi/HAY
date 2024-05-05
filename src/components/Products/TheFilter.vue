<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps(['value', 'filterField'])

function setFilter(filterField, value) {
  let query = { ...router.currentRoute.value.query }
  if (query.page) {
    query = { ...query, page: 1 }
  }
  if (value === 'reset') {
    delete query[filterField]

    router.replace({ query })

    return
  } else {
    query = { ...query, [filterField]: value }
  }

  router.push({ query: query })
}
</script>

<template>
  <div
    @click="setFilter(filterField, value)"
    class="cursor-pointer text-2xl font-light hover:font-medium hover:underline"
  >
    <slot></slot>
  </div>
</template>
