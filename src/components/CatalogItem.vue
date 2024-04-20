<template>
  <div class="flex flex-col">
    <div>
      <slot name="name"></slot>
      <slot name="price"></slot>
    </div>
    <div class="flex-1">
      <slot name="image"></slot>
    </div>
  </div>
</template>
