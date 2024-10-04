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
        <h2 class="text-xl font-bold mb-4">Delivery Information</h2>
        <p class="mb-6">
          We offer convenient and reliable delivery services for all our furniture products, including chairs and tables.
          Our standard delivery includes:
        </p>
        <ul class="list-disc list-inside mb-6">
          <li>Free delivery on orders over $500.</li>
          <li>Delivery typically takes between 5-10 business days.</li>
          <li>Our delivery team will contact you to schedule a delivery time that works for you.</li>
          <li>Assembly services are available upon request for an additional fee.</li>
          <li>We deliver to all locations in Europe.</li>
        </ul>
        <p class="mb-6">
          For any questions about our delivery options or to inquire about international shipping, please contact our customer service team at
          <strong>1-800-555-0199</strong> or email us at <strong>mail@vueDoIt.com</strong>.
        </p>
        <button
          @click="closeModal"
          class="border border-black bg-black px-4 py-2 text-sm font-medium text-white hover:border-gray-600 hover:bg-gray-600">Close</button>
      </div>
    </div>
  </teleport>
</template>


