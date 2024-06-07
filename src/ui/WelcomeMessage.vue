<template>
  <div
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
    class="flex flex-col items-center gap-8"
  >
    <img class="w-24" v-magnetic src="/src/assets/logo.svg" />
    <slot></slot>
  </div>
</template>
