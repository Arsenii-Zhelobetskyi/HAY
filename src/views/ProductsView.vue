<script setup>
import TheProducts from '../components/Products/TheProducts.vue'
</script>

<template>
  <aside>
    <div class="fixed">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </aside>
  <div class="col-span-3">
    <TheProducts />
  </div>
</template>
