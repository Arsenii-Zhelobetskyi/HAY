<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
defineProps(['item', 'isShow'])

const yValue = Math.random() * 300 - 200

const initial = ref({
  y: yValue,
  x: -100,
  opacity: 0
})

const enter = ref({
  y: 0,
  x: 0,
  opacity: 1
})
</script>

<template>
  <div
    v-if="isShow"
    v-motion
    :initial="initial"
    :enter="enter"
    :duration="1500"
    class="container flex flex-col hover:cursor-pointer"
    @click="router.push(`/product/${item.id}`)"
  >
    <div class="info-container flex justify-between">
      <div>
        {{ item.name }}
      </div>
      <div>
        {{ item.price }}
      </div>
    </div>
    <div class="image-container">
      <img :src="item.images[0]" alt="chair" class="h-full w-full object-cover" />
    </div>
  </div>
</template>

<style scoped>
.container {
  overflow: hidden !important;
}

.image-container {
  overflow: hidden;
  height: 100%;
  transform: translateY(0);
  transition: transform 1.2s ease-out;
}

.info-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  background-color: #fff;
  padding: 16px;
  transform: translateY(-50%);
  transition:
    transform 1.2s ease-out,
    opacity 1s ease-out;
}

.container:hover .image-container {
  transform: translateY(10%);
}

.container:hover .info-container {
  transform: translateY(0);
  opacity: 1;
}
</style>
