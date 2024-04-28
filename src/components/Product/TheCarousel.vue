<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

defineProps(['gallery'])
</script>
<template>
  <swiper
    :direction="'vertical'"
    :pagination="{
      clickable: true
    }"
    :modules="[Pagination]"
    class="mySwiper h-full w-full"
  >
    <swiper-slide
      v-for="(image, index) in gallery"
      class="flex items-center justify-center text-center text-4xl"
      :key="index"
    >
      <img :src="image" class="block h-full w-full object-cover" />
    </swiper-slide>
  </swiper>
</template>

<style>
.swiper-slide {
  display: flex;
}
.swiper-pagination {
  --swiper-pagination-right: auto;
  --swiper-pagination-left: 8px;
}
</style>
