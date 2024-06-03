<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const props = defineProps(['item', 'isPending'])

console.log(props.isPending)

const isShow = ref(false)

setTimeout(() => {
  isShow.value = true
}, 2700)
console.log(isShow.value)
</script>
<template>
  <div
    v-if="isShow"
    class="animated hover: flex flex-col hover:cursor-pointer"
    @click="router.push(`/product/${item.id}`)"
  >
    <div class="image-container flex-1">
      <img :src="item.images[0]" alt="chair" class="h-full w-full object-cover" />
    </div>
    <div class="info-container flex justify-between">
      <div>
        {{ item.name }}
      </div>
      <div>
        {{ item.price }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.animated {
  animation: slide-up 2s ease-out forwards;
}

.image-container {
  overflow: hidden;
  height: 100%;
  transition: height 1.5s ease-out;
}

.info-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  background-color: #fff;
  padding: 16px;
  transform: translateY(100%);
  transition: all 1.2s ease-out;
}

.animated:hover .image-container {
  height: 50%;
}

.animated:hover .info-container {
  transform: translateY(0);
  opacity: 1;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
