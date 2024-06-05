<script setup>
defineProps(['item'])
</script>
<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8">
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
