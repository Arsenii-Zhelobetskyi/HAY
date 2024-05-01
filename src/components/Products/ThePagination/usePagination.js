import { ref, watch } from 'vue'
/**
 * logic for pagination
 * @param {*} totalCount  total number of items
 * @param {*} pageSize  number of items per page
 * @param {*} siblingCount  number of items on each side of the current page
 */
export function usePagination(totalCount, pageSize, siblingCount = 2) {
  const pagination = ref([])
  const currentPage = ref(1)
  const totalPageCount = Math.ceil(totalCount / pageSize) // total number of pages
  //  support class and function
  class Dots {
    // so dots know where to go
    constructor(page) {
      this.label = '...'
      this.newCurrentPage = page
    }
  }

  function range(start, end) {
    // create an array of numbers
    const length = end - start + 1
    return Array.from({ length }, (_, index) => index + start)
  }

  function calculatePagination() {
    const totalPageNumbers = siblingCount + 5 // total number of page numbers to show in the pagination

    if (totalPageNumbers >= totalPageCount) {
      // case 1: when numbers of pages are less than the number we want to show in the pagination
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage.value - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage.value + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // case 2: when we only need to show right dots
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      const dots = new Dots(leftItemCount + 1)

      console.log(typeof dots.newCurrentPage)
      return [...leftRange, dots, totalPageCount]
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      // case 3: when we only need to show left dots

      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      const dots = new Dots(totalPageCount - rightItemCount)
      return [firstPageIndex, dots, ...rightRange]
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      // case 4: when we need to show both left and right dots
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      const rightDots = new Dots(rightSiblingIndex + 1)
      const leftDots = new Dots(leftSiblingIndex - 1)

      return [firstPageIndex, leftDots, ...middleRange, rightDots, lastPageIndex]
    }
  }
  function changePosition(value) {
    value instanceof Dots ? (currentPage.value = value.newCurrentPage) : (currentPage.value = value)
  }

  function goBack() {
    if (currentPage.value === 1) return
    currentPage.value--
  }

  function goForward() {
    if (currentPage.value === totalPageCount) return

    currentPage.value++
  }

  watch(
    currentPage,
    () => {
      pagination.value = calculatePagination()
    },
    { immediate: true }
  )
  return { pagination, goBack, goForward, currentPage, Dots, changePosition }
}
