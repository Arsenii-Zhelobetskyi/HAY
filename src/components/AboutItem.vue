<script setup>
const props = defineProps(['images'])
console.log(props.images)
</script>
<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8">
    <div :class="`${images.length > 1 ? 'order-2' : ''} flex flex-col items-center justify-center`">
      <h1 class="mb-5 justify-center font-bold">
        <slot name="title"></slot>
      </h1>
      <p class="text-center">
        <slot name="content"></slot>
      </p>
    </div>
    <div
      :class="`${images.length > 1 ? 'order-1 col-span-1' : 'col-span-2'}`"
      v-for="(image, index) in images"
      :key="index"
    >
      <img :src="image" alt="chair" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
