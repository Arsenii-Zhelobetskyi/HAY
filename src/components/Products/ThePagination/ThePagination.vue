<script setup>
import { usePagination } from './usePagination'
import { PAGE_SIZE, SIBLING_COUNT } from '@/utils/constants'
import { defineProps, ref, watch } from 'vue'

const props = defineProps(['count', 'isPending'])

const totalCount = ref(props.count)

watch(
  () => props.count,
  (newVal) => {
    totalCount.value = newVal
  }
)
const { pagination, goBack, goForward, currentPage, Dots, changePosition } = usePagination(
  totalCount,
  PAGE_SIZE,
  SIBLING_COUNT
)
</script>

<template>
  <div
    v-if="!isPending && pagination.length > 1"
    v-motion="{
      initial: {
        y: 100,
        opacity: 0
      },
      enter: {
        y: 0,
        opacity: 1,
        transition:{
          duration:500,
        }
      },
    }"
    class="absolute bottom-0 left-1/4 right-1/4 flex items-center justify-center text-2xl"
  >
    <div class="flex items-center justify-center gap-14">
      <div v-hoverable class="px-4 py-2 font-medium hover:bg-gray-200" @click="goBack">
        &#x3c; Previous
      </div>
      <div class="flex gap-1">
        <div
          v-for="(page, index) in pagination"
          v-hoverable
          :key="index"
          @click="changePosition(page)"
          :class="`${currentPage == page ? ' bg-black px-8  font-medium text-white' : ' hover:bg-gray-200'}   px-4 py-2`"
        >
          {{ page instanceof Dots ? '&#8230;' : page }}
        </div>
      </div>
      <div v-hoverable class="px-4 py-2 font-medium hover:bg-gray-200" @click="goForward">
        Next &#x3e;
      </div>
    </div>
  </div>
</template>
