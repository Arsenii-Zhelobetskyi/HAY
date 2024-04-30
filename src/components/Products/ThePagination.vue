<script setup>
import { ref, watch } from 'vue'

const position = ref(0)
const length = ref(76)
const quantityOfPages = ref(7)
const pagination = ref(
  Array.from(
    { length: length.value > quantityOfPages.value ? quantityOfPages.value : length.value },
    (_, index) => index + 1
  )
)

function changePosition(value) {
  position.value = value
}
watch(position, (value) => {
  if (value < pagination.value.length - 1) {
    return
  } else {
    pagination.value = pagination.value.slice(value - 3)
    pagination.value.push(value + 2)
  }
})
</script>
<template>
  <div class="justify-cente flex items-center">
    <div :v-if="length > 7 && position < 6" class="flex gap-1">
      <div
        v-for="(page, index) in pagination"
        :key="index"
        @click="changePosition(page)"
        :class="`${position === page ? 'bg-gray-300' : 'bg-gray-100'} cursor-pointer rounded-md p-2`"
      >
        {{ page }}
      </div>
      <div>...</div>
      <div>{{ length }}</div>
    </div>
  </div>
</template>
