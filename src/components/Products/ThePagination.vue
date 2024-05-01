<script setup>
import { ref, watch } from 'vue'
class Dots {
  constructor(page) {
    this.label = '...'
    this.newCurrentPage = page
  }
}

const currentPage = ref(1)
const contentCount = ref(90)

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

    const dots = new Dots(leftItemCount + 1)

    return [...leftRange, dots, totalPageCount]
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
    const dots = new Dots(totalPageCount - rightItemCount)
    return [firstPageIndex, dots, ...rightRange]
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex)
    const rightDots = new Dots(rightSiblingIndex + 1)
    const leftDots = new Dots(leftSiblingIndex - 1)
    return [firstPageIndex, leftDots, ...middleRange, rightDots, lastPageIndex]
  }
}

let pagination = usePagination(contentCount.value, 10, 2, currentPage.value)

watch(currentPage, (value) => {
  pagination = usePagination(contentCount.value, 10, 2, value)
  console.log(pagination)
})

function changePosition(value) {
  value instanceof Dots ? (currentPage.value = value.newCurrentPage) : (currentPage.value = value)
}
</script>
<template>
  <div class="flex items-center justify-center">
    <div class="flex gap-1">
      <div
        v-for="(page, index) in pagination"
        :key="index"
        @click="changePosition(page)"
        :class="`${currentPage == page ? 'bg-blue-700' : 'bg-red-100'} cursor-pointer rounded-md p-2`"
      >
        {{ page instanceof Dots ? page.label : page }}
      </div>
    </div>
  </div>
</template>
