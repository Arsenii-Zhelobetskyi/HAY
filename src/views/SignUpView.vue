<script setup>
import sidebarSignUp from '@/assets/sidebar-signUp.jpg'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <main class="grid grid-cols-4 font-normal">
    <section class="col-span-2 flex items-center justify-center px-6 pb-20 pt-8">
      <div class="max-w-96">
        <form class="flex flex-col gap-8" @submit="onSubmit">
          <h1 class="text-center text-4xl font-medium">Welcome to My App</h1>
          <h1 class="text-center text-4xl font-medium">Sign up</h1>
          <input
            v-model="email"
            v-bind="emailAttrs"
            placeholder="test@example.com"
            class="border-2 border-gray-600 px-5 py-4 text-2xl"
          />
          <div v-if="submitted === true" class="font-bold text-red-600">{{ errors.email }}</div>
          <input
            v-model="password"
            v-bind="passwordAttrs"
            placeholder="p@$$w0rd"
            class="border-2 border-gray-600 px-5 py-4 text-2xl"
            type="password"
            style="--webkit-text-security: square"
          />
          <div v-if="submitted === true" class="font-bold text-red-600">{{ errors.password }}</div>
          <button
            :disabled="isSubmitting"
            class="border-4 border-black bg-black px-20 py-4 text-2xl text-white hover:border-gray-600 hover:bg-gray-600"
          >
            {{ isSubmitting || signInIsPending ? 'Submitting...' : 'Submit' }}
          </button>
          <div class="text-center text-2xl font-thin">
            &#8212;
            <span class="hover:cursor-pointer hover:underline" @click="router.push('/sign-in')"
              >Sign in</span
            >
            &#8212;
          </div>
          <div if="signInError?.message" class="font-bold text-red-600">
            {{ signInError?.message }}
          </div>
        </form>
      </div>
    </section>
    <aside class="relative col-span-2 h-screen w-full pb-20">
      <img
        :src="sidebarSignUp"
        alt="Sign in"
        class="block h-full w-full object-cover object-bottom"
      />
    </aside>
  </main>
</template>
