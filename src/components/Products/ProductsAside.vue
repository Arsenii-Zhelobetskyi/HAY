<script setup>
import FilterRow from './FilterRow.vue'
import SortBy from './SortBy.vue'
import TagRow from './TagRow.vue'

const sortByOptions = [
  { value: 'price-desc', label: 'High Price' },
  { value: 'price-asc', label: 'Low Price' }
]
</script>

<template>
  <div class="fixed">
    <FilterRow />
    <TagRow />
    <SortBy :options="sortByOptions" />
  </div>
</template>
