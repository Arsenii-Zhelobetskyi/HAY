import './assets/tailwind.css'
import './cursor.js'
import { MotionPlugin } from '@vueuse/motion'
import { hoverableDirective } from './cursor'

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
app.use(router)
app.use(VueQueryPlugin)
app.use(Toast)

app.mount('#app')
