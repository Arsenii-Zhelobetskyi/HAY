<script setup>
import { useQueryClient } from '@tanstack/vue-query'
import { useContactStore } from '@/stores/contact'
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

const store = useContactStore()
const props = defineProps([
  'currentPage',
  'searchStoresData',
  'searchStores',
  'searchQuery',
  'searchStoresIsPending',
  'searchStoresIsSuccess',
  'searchStoresError',
  'updatePage',
  'dirty'
])

const resultsContainer = ref(null) // to watch scroll event
function setMapCenter(lat, lon) {
  store.setMapCenter([lat, lon])
}

// Infinite Scroll Detection

function onScroll() {
  const bottomOffset = 120 // pixels from the bottom of the scroll area

  if (resultsContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = resultsContainer.value
    if (scrollTop + clientHeight >= scrollHeight - bottomOffset) {
      props.updatePage(props.currentPage + 1)

      props.searchStores({ searchQuery: props.searchQuery, page: props.currentPage })
    }
  }
}

onMounted(() => {
  if (resultsContainer.value) {
    resultsContainer.value.addEventListener('scroll', onScroll)
  }
})

onUnmounted(() => {
  if (resultsContainer.value) {
    resultsContainer.value.removeEventListener('scroll', onScroll)
  }
})
// Infinite Scroll Detection

// for reacting on fetch updates
const queryClient = useQueryClient()
let results = []
watchEffect(() => {
  if (props.searchStoresIsSuccess) {
    results = queryClient.getQueryData(['searchStores'])
  }
})
</script>
<template>
  <div ref="resultsContainer" class="h-full flex-1 overflow-y-auto">
    <div class="flex flex-col gap-10">
      <div
        v-for="(data, idx) in results"
        :key="idx"
        @click="setMapCenter(data.lat, data.lon)"
        v-hoverable
        v-motion
        :initial="{
          y: -100,
          opacity: 0
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 250,
            damping: 25,
            mass: 0.5
          }
        }"
      >
        <div class="grid grid-cols-2 items-center">
          <div class="flex flex-col">
            <p class="text-2xl">{{ data.name }}</p>
            <p>{{ data.address }}</p>
          </div>
          <div class="flex justify-end">
            <span>{{ data.country }}, {{ data.city }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-5 text-center text-2xl"
      v-if="searchStoresIsSuccess && results.length === 0 && dirty"
    >
      We don't have store at this place /ᐠ｡ꞈ｡ᐟ\
    </div>
    <div class="mt-5 text-center text-2xl" v-if="searchStoresIsPending">Loading...</div>
    <div class="mt-5 text-center text-2xl" v-if="searchStoresError || true">
      {{ searchStoresError }}
    </div>
  </div>
</template>
