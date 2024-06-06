<script setup>
import { computed, watchEffect, ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { useContactStore } from '@/stores/contact'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

const props = defineProps(['searchStoresIsSuccess', 'searchStoresIsPending', 'searchStoresError'])

const store = useContactStore()
const queryClient = useQueryClient()

// for reacting on fetch updates
let results = ref([])
watchEffect(() => {
  if (props.searchStoresIsSuccess) {
    results.value = queryClient.getQueryData(['searchStores'])
  }
})

const center = computed(() => {
  //center of the map
  if (store.getMapCenter) return store.getMapCenter
  if (results.value[0]?.lat) {
    //first result of the search
    return [results.value[0]?.lat, results.value[0]?.lon]
  } else return [51.505, -0.159]
})

// custom marker icon
const customIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
</script>
<template>
  <div class="h-screen pb-20">
    <l-map style="cursor: none" :zoom="5" :minZoom="5" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      ></l-tile-layer>
      <l-marker
        v-for="(data, idx) in results"
        :key="idx"
        :lat-lng="[data.lat, data.lon]"
        :icon="customIcon"
      >
        <l-popup class="flex flex-col gap-2">
          <h1 class="text-2xl">{{ data.name }}</h1>
          <h1 class="text-lg font-thin">
            Open-hours: <span class="underline">{{ data.openHours }}</span>
          </h1>
          <h1 class="text-lg font-thin">
            Working-days: <span class="underline">{{ data.workDays }}</span>
          </h1>
          <h1 class="text-lg font-thin">{{ data.desc }}</h1>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
