<template>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <div>
        <slot name="name"></slot>
      </div>
      <div>
        <slot name="price"></slot>
      </div>
    </div>
    <div class="flex-1">
      <slot name="image"></slot>
    </div>
  </div>
</template>
