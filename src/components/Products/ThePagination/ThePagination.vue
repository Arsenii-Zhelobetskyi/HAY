<script setup>
import { usePagination } from './usePagination'
import { defineProps } from 'vue'

const props = defineProps({
  totalCount: Number,
  isPending: Boolean
})

console.log(props.totalCount)
// const count = computed(() => props.totalCount)
// console.log(count.value)
const { pagination, goBack, goForward, currentPage, Dots, changePosition } = usePagination(
  props.totalCount,
  10,
  2
)
</script>

<template>
  <div v-if="isPending">Loading</div>
  <div v-else class="mb-20 mt-8 flex items-center justify-center text-2xl">
    <div class="flex items-center justify-center gap-14">
      <div class="cursor-pointer px-4 py-2 font-medium hover:bg-gray-200" @click="goBack">
        &#x3c; Previous
      </div>
      <div class="flex gap-1">
        <div
          v-for="(page, index) in pagination"
          :key="index"
          @click="changePosition(page)"
          :class="`${currentPage == page ? ' bg-black px-8 py-8 font-medium text-white' : ' hover:bg-gray-200'} cursor-pointer   px-4 py-2`"
        >
          {{ page instanceof Dots ? '&#8230;' : page }}
        </div>
      </div>
      <div class="cursor-pointer px-4 py-2 font-medium hover:bg-gray-200" @click="goForward">
        Next &#x3e;
      </div>
    </div>
  </div>
</template>
