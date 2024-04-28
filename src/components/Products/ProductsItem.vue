<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps(['item'])
</script>
<template>
  <div
    class="hover: flex flex-col hover:cursor-pointer"
    @click="router.push(`/product/${item.id}`)"
  >
    <div class="flex justify-between">
      <div>
        {{ item.name }}
      </div>
      <div>
        {{ item.price }}
      </div>
    </div>
    <div class="flex-1">
      <img :src="item.image" alt="chair" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
