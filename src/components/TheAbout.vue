<script setup>
import AboutItem from './AboutItem.vue'

const about = [
  {
    id: 1,
    title: 'OUR VISION',
    content:
      'HAY has always believed that good design is everyone’s right. That’s why, from the very beginning, co-founders and Creative Directors Mette and Rolf Hay committed to working with their generation’s best designers from all over the world to create high-quality products that would be available to a wide audience. This founding principle continues to motivate us today.',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/icons_portrait_1390x800?w=900'
    ]
  },
  {
    id: 2,
    title: 'WHAT WE DO',
    content:
      'We are inspired by the realities of life today, in which traditional divides between personal and professional space are more fluid, so our furniture, lighting, and accessories can be used in a diversity of environments and suit many needs. From a toothbrush to a paper bin to a sofa, HAY products always offer a fresh take on the quotidian objects that are part of our everyday.',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/palissade-hot-galvanised_910x1100.jpg?w=500',
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/arcs-mirror_result-chair_910x1100.jpg?w=500'
    ]
  },
  {
    id: 3,
    title: 'OUR BRAND',
    content:
      'At HAY, everything we make draws from three primary sources of inspiration: art, architecture, and fashion. We have always paid close attention to and been inspired by our surroundings, and putting our finger on the pulse of contemporary culture is how we keep pace with the world around us.',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/icons_1390x800.jpg?w=900'
    ]
  }
]
</script>
<template>
  <div class="grid gap-6">
    <AboutItem v-for="aboutItem in about" :key="aboutItem.id" :images="aboutItem.images">
      <template #content>
        {{ aboutItem.content }}
      </template>
      <template #title>
        {{ aboutItem.title }}
      </template>
    </AboutItem>
  </div>
</template>
