<script setup>
import TheAbout from '../components/About/TheAbout.vue'
import { useAboutStore } from '@/stores/about'
const aboutStore = useAboutStore()
</script>

<template>
  <main class="grid grid-cols-4 px-6 pb-20 pt-8 font-normal">
    <aside>
      <div class="fixed left-0 top-0 h-screen w-64 bg-white pl-6 pt-4 shadow-md">
        <nav class="flex flex-col py-4">
          <a
            v-for="aboutItem in aboutStore.about"
            :key="aboutItem.id"
            :href="`#${aboutItem.title}`"
            class="text-lg font-medium text-gray-600 transition duration-300 ease-in-out hover:text-gray-900"
            >{{ aboutItem.title }}</a
          >
        </nav>
      </div>
    </aside>
    <section class="col-span-3">
      <TheAbout />
    </section>
  </main>
</template>
