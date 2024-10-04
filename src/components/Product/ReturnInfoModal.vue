<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isVisible: Boolean
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Return Information</h2>
        <p class="mb-6">
          We strive to ensure that you are satisfied with your furniture purchase. If, for any reason, you wish to return an item,
          please follow our return policy guidelines:
        </p>
        <ul class="list-disc list-inside mb-6">
          <li>Returns are accepted within 30 days of the delivery date.</li>
          <li>Items must be in their original condition and packaging.</li>
          <li>A restocking fee of 10% applies to all returned items.</li>
          <li>Shipping costs for returns are the responsibility of the customer.</li>
        </ul>
        <p class="mb-6">
          To initiate a return, please contact our support team at <strong>1-800-555-0199</strong> or email us at <strong>mail@vueDoIt.com</strong>.
          Once your return is approved, you will receive instructions on how to send back the items.
        </p>
        <button
          @click="closeModal"
          class="border border-black bg-black px-4 py-2 text-sm font-medium text-white hover:border-gray-600 hover:bg-gray-600">Close</button>
      </div>
    </div>
  </teleport>
</template>
