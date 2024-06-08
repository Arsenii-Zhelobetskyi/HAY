<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentUser, logout, updatePassword, updateEmail } from '@/services/apiAuth.js'

const user = ref(null)
const loading = ref(true)
const showSettings = ref(false)
const showEmailForm = ref(false)
const showPasswordForm = ref(false)
const newEmail = ref('')
const newPassword = ref('')

const handleLogout = async () => {
  await logout()
  location.reload()
}

const updateUserEmail = async () => {
  try {
    if (newEmail.value) {
      await updateEmail(newEmail.value)
      user.value = await getCurrentUser()
      showEmailForm.value = false
    }
  } catch (error) {
    console.error(error.message)
  }
}

const updateUserPassword = async () => {
  try {
    if (newPassword.value) {
      await updatePassword(newPassword.value)
      user.value = await getCurrentUser()
      showPasswordForm.value = false
    }
  } catch (error) {
    console.error(error.message)
  }
}

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const toggleEmailForm = () => {
  showEmailForm.value = !showEmailForm.value
  if (showEmailForm.value) {
    showPasswordForm.value = false
  }
}

const togglePasswordForm = () => {
  showPasswordForm.value = !showPasswordForm.value
  if (showPasswordForm.value) {
    showEmailForm.value = false
  }
}

onMounted(async () => {
  user.value = await getCurrentUser()
  loading.value = false
})
</script>

<template>
  <div class="animate-slide-in text-2xl">
    <div v-if="loading"></div>
    <div v-else-if="user" class="font-thin">
      <button
        v-hoverable
        v-motion="{ enter: { y: 0 }, hovered: { y: -5, transition: { duration: 500 } } }"
        @click="$emit('back')"
      >
        <span class="text-2xl">↑</span> Come back
      </button>
      <div>
        <p class="my-4 font-semibold">Your email: {{ user.email }}</p>
        <div>
          <button @click="toggleSettings" class="py-3 text-blue-500 hover:underline">
            Settings
          </button>
          <button
            @click="handleLogout"
            class="duration-600 ml-60 rounded-lg px-7 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <div v-if="showSettings">
        <div>
          <button
            v-motion="{
              initial: { y: -10 },
              enter: { y: 0 }
            }"
            @click="toggleEmailForm"
            class="text-blue-500 hover:underline"
          >
            Change Email
          </button>
        </div>
        <div>
          <button
            v-motion="{
              initial: { y: -20 },
              enter: { y: 0 }
            }"
            @click="togglePasswordForm"
            class="text-blue-500 hover:underline"
          >
            Change Password
          </button>
        </div>
        <form v-if="showEmailForm" @submit.prevent="updateUserEmail" class="grid">
          <label for="email">new email:</label>
          <input type="email" id="email" v-model="newEmail" class="border border-gray-400" />
          <button class="hover:underline" type="submit">Save Email</button>
          <button class="hover:underline" type="button" @click="toggleEmailForm">Cancel</button>
        </form>
        <form v-if="showPasswordForm" @submit.prevent="updateUserPassword" class="grid">
          <label for="password">new password:</label>
          <input
            type="password"
            id="password"
            v-model="newPassword"
            class="border border-gray-400"
          />
          <button class="hover:underline" type="submit">Save Password</button>
          <button class="hover:underline" type="button" @click="togglePasswordForm">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>
