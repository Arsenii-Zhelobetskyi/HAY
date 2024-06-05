<script setup>
const props = defineProps(['item'])
import { ref, watch, onMounted } from 'vue'

const yScroll = ref(0)
const isShow = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    yScroll.value = window.scrollY
  })

  console.log('yScroll: ', yScroll)
  if (scrollDistances[props.item.id] <= yScroll.value) {
    isShow.value = true
  }
})

const scrollDistances = {
  1: 0,
  2: 0,
  3: 10,
  4: 350,
  5: 500,
  6: 650
}

watch(yScroll, () => {
  console.log('watch yScroll: ', yScroll)
  if (scrollDistances[props.item.id] <= yScroll.value) {
    isShow.value = true
  }
})

watch(isShow, (newValue) => {
  isShow.value = newValue
})
</script>
<template>
  <div
    v-if="isShow"
    :id="item.title"
    class="grid snap-center grid-cols-3 gap-6 gap-y-8"
    v-motion
    :initial="{
      y: -250,
      opacity: 0
    }"
    :enter="{
      y: 0,
      opacity: 1,
      transition: {
        duration: 2000,
        delay: 200 + (item.id - 1) * 1000
      }
    }"
  >
    <div
      :class="`${item.imagePosition === 'left' ? 'order-2' : ''} flex flex-col items-center justify-center`"
    >
      <h1 class="mb-5 justify-center font-bold">
        {{ item.title }}
      </h1>
      <p v-hoverable class="text-center">
        {{ item.content }}
      </p>
    </div>
    <div
      :class="`${item.images.length > 1 ? 'col-span-1' : 'col-span-2'} ${item.imagePosition === 'left' ? 'order-1' : ''} `"
      v-for="(image, index) in item.images"
      :key="index"
    >
      <img :src="image" alt="chair" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
