<script setup>
import MainInput from '@/ui/MainInput.vue'

const phoneData = [
  {
    title: 'Germany & EU',
    phones: ['+49 (221) 5481 6139', '+49 (152) 5841 5396']
  },
  {
    title: 'UK',
    phones: ['+44 (792) 9671 008']
  },
  {
    title: 'Scandinavia (FIN)',
    phones: ['+358 (40) 556 5883']
  },
  {
    title: 'Asia (CHN)',
    phones: ['+86 (137) 9531 1193']
  }
]
const emailData = {
  title: 'Write us at',
  email: 'mail@vueDoIt.com'
}
const socialData = {
  title: 'Socials',
  socials: [
    { name: 'Twitter', link: 'https://www.twitter.com/' },
    { name: 'Facebook', link: 'https://www.facebook.com/' },
    { name: 'Instagram', link: 'https://www.instagram.com/' }
  ]
}
</script>
<template>
  <div class="grid grid-cols-2">
    <div>
      <h1 class="mb-10 text-5xl font-medium">
        Got any questions? <br />
        Contact us! <br />
        Or look out for our store.
      </h1>
      <MainInput placeholder="Search for our St0rE" />
    </div>
    <div class="text-right">
      <div
        v-hoverable
        v-motion="{
          initial: {
            y: 100,
            opacity: 0
          },
          enter: {
            y: 0,
            opacity: 1
          }
        }"
        v-for="(data, idx) in phoneData"
        :key="idx"
        class="mb-10"
      >
        <p class="mb-2 text-xl font-thin uppercase">{{ data.title }}</p>
        <h1 v-for="(phone, phoneId) in data.phones" :key="phoneId" class="text-4xl font-medium">
          {{ phone }}
        </h1>
      </div>
      <div class="mb-10">
        <p class="mb-2 text-xl font-thin uppercase">{{ emailData.title }}</p>
        <h1 class="text-4xl font-medium">{{ emailData.email }}</h1>
      </div>
      <div>
        <p class="mb-2 text-xl font-thin uppercase">{{ socialData.title }}</p>
        <a
          v-for="(social, socialId) in socialData.socials"
          :key="socialId"
          class="block text-4xl font-medium"
          :href="social.link"
        >
          {{ social.name }}
        </a>
      </div>
    </div>
  </div>
</template>
