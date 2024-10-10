<script setup>
const props=defineProps(['options'])

import { useRouter } from 'vue-router'
const router = useRouter()
const filterField = 'sortBy'

function setSortBy(value) {
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
  <div class="mt-16">
    <label class="text-2xl font-light cursor-none">Sort</label>
    <div class="flex gap-2">
      <div
        class="text-2xl font-light hover:font-medium hover:underline"
        @click="setSortBy('reset')"
        v-hoverable
      >
        All,
      </div>
      <div
        v-for="(option, index) in options"
        :key="index"
    :class="`text-2xl font-light hover:font-medium hover:underline ${router.currentRoute.value.query[filterField]===option.value ? 'font-medium underline':''} `"
        @click="setSortBy(option.value)"
        v-hoverable
      >
        {{ option.label }}{{ index == options.length - 1 ? '.' : ',' }}
      </div>
    </div>
  </div>
</template>
