<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
</script>
<template>
  <div class="h-screen pb-20">
    <l-map :zoom="15" :center="[51.505, -0.159]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      ></l-tile-layer>
    </l-map>
  </div>
</template>
