<script setup>
const props = defineProps(['aboutItem'])
console.log(props.aboutItem)
</script>
<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8">
    <div
      :class="`${aboutItem.imagePosition === 'left' ? 'order-2' : ''} flex flex-col items-center justify-center`"
    >
      <h1 class="mb-5 justify-center font-bold">
        {{ aboutItem.title }}
      </h1>
      <p class="text-center">
        {{ aboutItem.content }}
      </p>
    </div>
    <div
      :class="`${aboutItem.images.length > 1 ? 'col-span-1' : 'col-span-2'} ${aboutItem.imagePosition === 'left' ? 'order-1' : ''} `"
      v-for="(image, index) in aboutItem.images"
      :key="index"
    >
      <img :src="image" alt="chair" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
