import './assets/tailwind.css'
import { MotionPlugin } from '@vueuse/motion'
import { hoverableDirective } from './utils/cursorHoverable'
import { magneticDirective } from './utils/cursorMagnetic'
// import { stickDirective } from './utils/cursorStick'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(MotionPlugin)
app.use(createPinia())
app.directive('hoverable', hoverableDirective)
app.directive('magnetic', magneticDirective)
// app.directive('stick', stickDirective)

app.use(router)
app.use(VueQueryPlugin)
app.use(Toast)

app.mount('#app')
