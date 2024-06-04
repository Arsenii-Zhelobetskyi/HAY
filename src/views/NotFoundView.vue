<script setup>
import sidebarSignIn from '@/assets/sidebar-signIn.jpg'
import TheArrow from '../ui/TheArrow.vue'
</script>

<template>
  <main class="grid grid-cols-3 font-normal">
    <section class="col-span-1 flex items-center justify-center px-10 pb-20 pt-8">
      <div
        class="flex max-w-96 flex-col items-center justify-center gap-10 text-2xl font-light text-gray-600"
      >
        <div class="text-4xl font-medium text-black">
          Oops, the page with this URL does not exist...
        </div>
        <div>Let's go choose a new table and chair for you</div>
        <the-arrow></the-arrow>
        <RouterLink to="/products" class="btn border-4 border-gray-600 px-10 py-4 font-medium">
          Our Products
        </RouterLink>
      </div>
    </section>
    <aside class="relative col-span-2 h-screen w-full">
      <img
        v-motion
        :initial="{
          y: -850
        }"
        :enter="{
          y: 0,
          transition: {
            duration: 2000
          }
        }"
        :src="sidebarSignIn"
        alt="Sign in"
        class="block h-full w-full object-cover object-bottom"
      />
    </aside>
  </main>
</template>

<style scoped>
.btn {
  background-color: none;
  color: rgb(75 85 99);
  transition: all 0.6s ease;
}

.btn:hover {
  background-color: rgb(75 85 99);
  color: rgb(255 255 255);
}
</style>
