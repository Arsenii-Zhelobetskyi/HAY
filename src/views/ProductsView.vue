<script setup>
import ThePagination from '@/components/Products/ThePagination.vue'
import TheProducts from '../components/Products/TheProducts.vue'
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
      <TheProducts />
      <ThePagination />
    </section>
  </main>
</template>
