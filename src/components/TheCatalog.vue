<script setup>
import CatalogItem from './CatalogItem.vue'

const catalog = [
  {
    id: 1,
    name: 'very cool chair',
    price: 1200,
    image:
      'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'very cool chair',
    price: 1200,
    image: 'https://woodendot.com/cdn/shop/files/LUA-LAMP-Vertical-1.1.jpg?v=1711968297&width=1368'
  },
  {
    id: 3,
    name: 'very cool chair',
    price: 1200,
    image:
      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'very cool chair',
    price: 1200,
    image: 'https://woodendot.com/cdn/shop/files/LUA-LAMP-Vertical-1.1.jpg?v=1711968297&width=1368'
  },
  {
    id: 5,
    name: 'very cool chair',
    price: 1200,
    image: 'https://via.placeholder.com/450x550'
  },
  {
    id: 6,
    name: 'very cool chair',
    price: 1200,
    image: 'https://via.placeholder.com/450x550'
  }
]
</script>

<template>
  <div class="grid grid-cols-3 gap-6 gap-y-8">
    <CatalogItem v-for="catalogItem in catalog" :key="catalogItem.id">
      <template #name>{{ catalogItem.name }}</template>
      <template #price>{{ catalogItem.price }}</template>
      <template #image>
        <img :src="catalogItem.image" alt="chair" class="w-full h-full object-cover" />
      </template>
    </CatalogItem>
  </div>
</template>
