<script setup>
import { ref, watch } from 'vue'
const DOTS = '...'
const currentPage = ref(1)
const contentCount = ref(80)

function range(start, end) {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

function usePagination(totalCount, pageSize, siblingCount = 2, currentPage) {
  const totalPageCount = Math.ceil(totalCount / pageSize)

  const totalPageNumbers = siblingCount + 5

  console.log(totalPageNumbers)
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

  const firstPageIndex = 1
  const lastPageIndex = totalPageCount

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = range(1, leftItemCount)

    return [...leftRange, DOTS, totalPageCount]
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
    return [firstPageIndex, DOTS, ...rightRange]
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex)
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }
}

let pagination = usePagination(contentCount.value, 10, 2, currentPage.value)

watch(currentPage, (value) => {
  pagination = usePagination(contentCount.value, 10, 2, value)
})

function changePosition(value, index) {
  currentPage.value = value
}
</script>
<template>
  <div class="flex items-center justify-center">
    <div class="flex gap-1">
      <div
        v-for="(page, index) in pagination"
        :key="index"
        @click="changePosition(page, index)"
        :class="`${currentPage == page ? 'bg-blue-700' : 'bg-red-100'} cursor-pointer rounded-md p-2`"
      >
        {{ page === DOTS ? DOTS : page }}
      </div>
    </div>
  </div>
</template>
