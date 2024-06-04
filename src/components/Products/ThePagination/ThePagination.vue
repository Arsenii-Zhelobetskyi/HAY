<script setup>
import { usePagination } from './usePagination'
import { PAGE_SIZE, SIBLING_COUNT } from '@/utils/constants'
import { defineProps, ref, watch } from 'vue'

const props = defineProps(['count', 'isPending'])

const isShow = ref(false)

if (props.isPending) {
  setTimeout(() => {
    isShow.value = true
  }, 6000)
  console.log(isShow.value)
}

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
  <div v-if="isShow" class="mb-20 mt-8 flex items-center justify-center text-2xl">
    <div class="flex items-center justify-center gap-14">
      <div class="cursor-pointer px-4 py-2 font-medium hover:bg-gray-200" @click="goBack">
        &#x3c; Previous
      </div>
      <div class="flex gap-1">
        <div
          v-for="(page, index) in pagination"
          :key="index"
          @click="changePosition(page)"
          :class="`${currentPage == page ? ' bg-black px-8  font-medium text-white' : ' hover:bg-gray-200'} cursor-pointer   px-4 py-2`"
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
