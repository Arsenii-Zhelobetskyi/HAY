<script setup>
import sidebarSignIn from '@/assets/sidebar-signIn.webp'
import SignInForm from '@/components/SignIn/SignInForm.vue'
import WelcomeMessage from '@/ui/WelcomeMessage.vue'
</script>

<template>
  <main class="grid grid-cols-4 font-normal">
    <aside class="relative col-span-2 h-screen w-full">
      <img
        :src="sidebarSignIn"
        alt="Sign in"
        class="block h-full w-full object-cover object-bottom"
      />
    </aside>
    <section class="col-span-2 flex items-center justify-center px-6 pb-20 pt-8">
      <div class="flex max-w-96 flex-col items-center gap-8">
        <WelcomeMessage>
          <h1 class="text-center text-4xl font-medium">Welcome to My App</h1>
          <h1 class="text-center text-4xl font-medium">Sign in</h1>
        </WelcomeMessage>
        <SignInForm />
      </div>
    </section>
  </main>
</template>
