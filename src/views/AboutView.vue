<script setup>
import TheAbout from '../components/About/TheAbout.vue'
import { useAboutStore } from '@/stores/about'
const aboutStore = useAboutStore()
</script>

<template>
  <main class="grid grid-cols-4 scroll-smooth px-6 pb-20 pt-8 font-normal">
    <aside>
      <div class="fixed left-0 top-0 h-screen w-80 bg-white pl-6 shadow-md">
        <nav class="flex h-screen flex-col justify-around pb-32">
          <a
            v-motion
            v-hoverable
            :initial="{ scale: 1, x: 0 }"
            :hovered="{
              scale: 1.1,
              x: 40,
              transition: {
                duration: 700
              }
            }"
            v-for="aboutItem in aboutStore.about"
            :key="aboutItem.id"
            :href="`#${aboutItem.title}`"
            class="font-large text-lg"
            >{{ aboutItem.title }}</a
          >
        </nav>
      </div>
    </aside>
    <section class="col-span-3 scroll-smooth">
      <TheAbout />
    </section>
  </main>
</template>
