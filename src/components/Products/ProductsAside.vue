<script setup>
import FilterRow from './FilterRow.vue'
import SortBy from './SortBy.vue'

const sortByOptions = [
  { value: 'price-desc', label: 'High Price' },
  { value: 'price-asc', label: 'Low Price' }
]
</script>

<template>
  <div>
    <FilterRow />
    <SortBy :options="sortByOptions" />
  </div>
</template>
