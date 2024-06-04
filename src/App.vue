<template>
  <div class="cursor" ref="cursor">
    <div class="cursor__ball cursor__ball--big" ref="bigBall">
      <svg height="30" width="30">
        <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
      </svg>
    </div>
    <div class="cursor__ball cursor__ball--small" ref="smallBall">
      <svg height="10" width="10">
        <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
      </svg>
    </div>
  </div>

  <RouterView />
  <div class="bg"></div>
  <!-- <VueQueryDevtools /> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useCursorStore } from '@/stores/cursor'
const cursor = ref(null)
const bigBall = ref(null)
const smallBall = ref(null)
const store = useCursorStore()
onMounted(() => {
  document.body.addEventListener('mousemove', onMouseMove)
})

function onMouseMove(e) {
  gsap.to(bigBall.value, { duration: 0.4, x: e.clientX - 15, y: e.clientY - 15 })
  gsap.to(smallBall.value, { duration: 0.1, x: e.clientX - 5, y: e.clientY - 7 })
}
const hoverableDirective = {
  mounted(el) {
    el.addEventListener('mouseover', onMouseHover)
    el.addEventListener('mouseout', onMouseHoverOut)
  },
  unmounted(el) {
    el.removeEventListener('mouseover', onMouseHover)
    el.removeEventListener('mouseout', onMouseHoverOut)
  }
}

function onMouseHover() {
  gsap.to(bigBall.value, { duration: 0.3, scale: 4 })
}

function onMouseHoverOut() {
  gsap.to(bigBall.value, { duration: 0.3, scale: 1 })
}
store.setBigBall(bigBall)
</script>

<style>
html {
  background: #fff;

  cursor: none;
}
#app {
  height: 100vh;
}
.cursor {
  pointer-events: none;
  z-index: 99999;
}

.cursor__ball {
  position: fixed;
  top: 0;
  left: 0;
  mix-blend-mode: difference;
  z-index: 99999;
}

.cursor__ball circle {
  fill: #f7f8fa;
  z-index: 99999;
}
</style>
