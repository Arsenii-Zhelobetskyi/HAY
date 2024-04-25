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
    ],
    imagePosition: 'right'
  },
  {
    id: 2,
    title: 'WHAT WE DO',
    content:
      'We are inspired by the realities of life today, in which traditional divides between personal and professional space are more fluid, so our furniture, lighting, and accessories can be used in a diversity of environments and suit many needs. From a toothbrush to a paper bin to a sofa, HAY products always offer a fresh take on the quotidian objects that are part of our everyday.',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/palissade-hot-galvanised_910x1100.jpg?w=500',
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/arcs-mirror_result-chair_910x1100.jpg?w=500'
    ],
    imagePosition: 'left'
  },
  {
    id: 3,
    title: 'OUR BRAND',
    content:
      'At HAY, everything we make draws from three primary sources of inspiration: art, architecture, and fashion. We have always paid close attention to and been inspired by our surroundings, and putting our finger on the pulse of contemporary culture is how we keep pace with the world around us.',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/icons_1390x800.jpg?w=900'
    ],
    imagePosition: 'right'
  },
  {
    id: 4,
    title: '',
    content:
      '“What I admire about art is the unexpected, the originality; architecture is of course the context and the home of what we make, and fashion has a wonderful dynamism to it, reflecting the spirit of the time and what’s happening right now. I would say that the best products we have done, they may exist somewhere in between these three environments, drawing from a little bit of everything.” — Rolf Hay',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/stole_910x1100.jpg?w=300',
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/hay_brand_910x1100.jpg?w=300'
    ],
    imagePosition: 'left'
  },
  {
    id: 5,
    title: 'OUR DESIGNERS',
    content:
      'At HAY, we believe that we are constantly working with the most talented, curious, and courageous designers from around the world, and every one of them is a member of the HAY family.',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/hays-world/hay-in-the-world/2020-hay-in-the-world/all-about-hay/our-people_all-designers_amaliegade_910x1100.jpg?w=500',
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/ronan-and-erwan-bouroullec_palissade_bw_910x1100.jpg?w=500'
    ],
    imagePosition: 'right'
  },
  {
    id: 6,
    title: 'OUR STORES',
    content:
      'Like the products we make and the world we live in, our stores are always evolving to reflect our universe.While our creative headquarters remain in Copenhagen, you can visit us in HAY stores in cities around the world. ',
    images: [
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/hay-house2_910x1100.jpg?w=500',
      'https://www.hay.dk/globalassets/blocks/brandsite/footer/about/about-hay/our-stores-01_910x1100.jpg?w=500'
    ],
    imagePosition: 'left'
  }
]
</script>
<template>
  <div class="grid gap-6">
    <AboutItem v-for="aboutItem in about" :key="aboutItem.id" :item="aboutItem" />
  </div>
</template>
