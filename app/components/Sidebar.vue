<template>
  <div class="fixed left-0 top-0 h-full z-30 bg-white dark:bg-neutral-900 border-e border-gray-200 dark:border-neutral-800 w-full max-w-64 transition-transform duration-300" :class="[ sidebarOpen.desktop ? 'md:translate-x-0' : 'md:-translate-x-full', sidebarOpen.mobile ? 'translate-x-0' : '-translate-x-full']">
    <button type="button" @click="sidebar.closeMobile()" :title="$t('sidebar.close')" :aria-label="$t('sidebar.close')" class="md:hidden absolute top-4 right-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-800 rounded-lg p-0.75 transition-colors cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    <div class="p-6">
      <Logo />

      <nav class="mt-8 space-y-1">
        <NavigationItem to="/dashboard">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge-icon lucide-gauge"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
          </template>

          {{ $t('nav.dashboard') }}
        </NavigationItem>
      </nav>
    </div>

  </div>
</template>

<script lang="ts" setup>
const sidebar = useSidebar()

const sidebarOpen = computed(() => sidebar.sidebarOpen.value)
</script>