<template>
  <div
    v-motion
    :initial="{
      scale: 1,
      y: -10,
      z: 0
    }"
    :enter="{
      scale: 1.2,
      y: 10,
      z: 10,
      transition: {
        duration: 1000,
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }"
    class="arrow"
  >
    <svg
      class="arrow-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="48"
      height="48"
      fill="currentColor"
    >
      <path
        d="M12 2a1 1 0 0 1 1 1v15.59l4.3-4.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 1 1 1.4-1.42l4.3 4.3V3a1 1 0 0 1 1-1z"
      />
    </svg>
  </div>
</template>

<style scoped>
.arrow {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
