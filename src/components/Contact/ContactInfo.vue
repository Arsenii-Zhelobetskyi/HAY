<script setup>
const data = [

  {
    title: 'Germany & EU',
    content: ['+49 (221) 5481 6139', '+49 (152) 5841 5396']
  },
  {
    title: 'UK',
    content: ['+44 (792) 9671 008']
  },
  {
    title: 'Scandinavia (FIN)',
    content: ['+358 (40) 556 5883']
  },
  {
    title: 'Asia (CHN)',
    content: ['+86 (137) 9531 1193']
  },
  {
    title: 'Write us at',
    content: ['mail@vueDoIt.com']
  },
  {
    title: 'Socials',
    type: 'socials',
    content: [
      { name: 'Twitter', link: 'https://www.twitter.com/' },
      { name: 'Facebook', link: 'https://www.facebook.com/' },
      { name: 'Instagram', link: 'https://www.instagram.com/' }
    ]
  }
]
</script>
<template>
  <div
    v-for="(item, idx) in data"
    :key="idx"
    v-motion="{
      initial: {
        y: 100,
        opacity: 0
      },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          delay: 100 * idx
        }
      }
    }"
    class="mb-10"
  >
  <p class="mb-2 text-3xl font-semibold  uppercase">{{ item.title }}</p>
  <!-- <h1 v-for="(itemEl, phoneId) in item.content" :key="phoneId" class="text-4xl font-medium">
      <a v-if="item.type" :href="itemEl.link" v-hoverable> {{ itemEl.name }}</a>
      <span v-else v-hoverable> {{ itemEl }}</span>
    </h1> -->
  <h1 v-for="(itemEl, phoneId) in item.content" :key="phoneId" class="text-3xl ">
      <a v-if="item.type" :href="itemEl.link" v-hoverable> {{ itemEl.name }}</a>
      <span v-else v-hoverable> {{ itemEl }}</span>
    </h1>
  </div>
</template>
