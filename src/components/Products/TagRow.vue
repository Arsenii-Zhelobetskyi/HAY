<script setup>
import { useQuery } from '@tanstack/vue-query'

import {getTags} from '@/services/apiProducts'

import TheFilter from './TheFilter.vue'
const {data:tags,isPending}=useQuery({
    queryKey:['tags'],
    queryFn:()=>getTags(),
    staleTime:Infinity
})

</script>

<template>
  <div class="mt-16">
    <label class="text-2xl font-light cursor-none">Tags</label>
    <div class="flex gap-2">
      <div v-if="isPending" className='text-2xl font-light'>Loading...</div>
      <template v-else>
        <TheFilter value="reset" filterField="tag">All,</TheFilter>
        <TheFilter
          v-for="(tag, index) in tags"
          :key="tag.id"
          :value="tag.id"
          filterField="tag"
        >
          {{tag.name }}{{ index ==tags.length - 1 ? '.' : ',' }}
        </TheFilter>
      </template>
    </div>
  </div>
</template>

