<script setup>
import sidebarSignUp from '@/assets/sidebar-signUp.webp'
import SignUpForm from '@/components/SignUp/SignUpForm.vue'
import WelcomeMessage from '@/ui/WelcomeMessage.vue'
</script>
<template>
  <main class="grid grid-cols-4 font-normal">
    <section class="col-span-2 flex items-center justify-center px-6 pb-20 pt-8">
      <div class="flex max-w-96 flex-col gap-8">
        <WelcomeMessage>
          <h1 class="text-center text-4xl font-medium">Welcome to My App</h1>
          <h1 class="text-center text-4xl font-medium">Sign up</h1>
        </WelcomeMessage>
        <SignUpForm />
      </div>
    </section>
    <aside class="relative col-span-2 h-screen w-full">
      <img
        :src="sidebarSignUp"
        alt="Sign in"
        class="block h-full w-full object-cover object-bottom"
      />
    </aside>
  </main>
</template>
