<script setup>
import { useQuery } from '@tanstack/vue-query'
import { getCategories } from '../../services/apiProducts'

import TheFilter from './TheFilter.vue'

const { data: categories, isPending } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories()
})
</script>
<template>
  <div class="mt-16">
    <label class="text-2xl font-light">Categories</label>
    <div class="flex gap-2">
      <div v-if="isPending">Loading...</div>
      <template v-else>
        <TheFilter value="reset" filterField="category">All,</TheFilter>
        <TheFilter
          v-for="(filter, index) in categories"
          :key="filter.id"
          :value="filter.id"
          filterField="category"
        >
          {{ filter.name }}{{ index == categories.length - 1 ? '.' : ',' }}
        </TheFilter>
      </template>
    </div>
  </div>
</template>
