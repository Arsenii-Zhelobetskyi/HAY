<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <aside>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </aside>
  <main class="col-span-3">
    <RouterView />
  </main>
  <header
    class="fixed bottom-0 left-0 right-0 grid h-20 grid-cols-4 content-center bg-white p-1 px-6 font-normal"
  >
    <RouterLink to="/">My App</RouterLink>
    <nav class="col-span-3 grid grid-cols-3 gap-6">
      <nav class="flex justify-between">
        <RouterLink to="/">Catalog</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <h1>Search</h1>
      </nav>
      <div class="col-start-3 flex justify-between">
        <h1>Contact</h1>
        <h1>Profile</h1>
        <h1>Cart</h1>
      </div>
    </nav>
  </header>
</template>
