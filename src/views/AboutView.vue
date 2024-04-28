<script setup>
import TheAbout from '../components/About/TheAbout.vue'
</script>
<template>
  <main class="grid grid-cols-4 px-6 pb-20 pt-8 font-normal">
    <aside>
      <div class="fixed">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </aside>
    <section class="col-span-3">
      <TheAbout />
    </section>
  </main>
</template>
