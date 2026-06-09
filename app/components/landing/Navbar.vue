<template>
  <nav class="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <UiLogo />

      <div class="flex items-center gap-6">
        <NuxtLink v-if="!authStore.loggedIn" to="/sign-in" class="hidden sm:block text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          Sign in
        </NuxtLink>
        <NuxtLink v-if="authStore.loggedIn" to="/search" class="text-sm px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors font-medium">
          Open app
        </NuxtLink>
        <NuxtLink v-else to="/sign-in" class="text-sm px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors font-medium">
          Get started free
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>
