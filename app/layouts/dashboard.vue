<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex">
    <Sidebar />

    <div class="flex flex-col grow transition-all duration-300" :class="sidebarOpen.desktop ? 'md:ml-64' : 'ml-0'">
      <AppHeader />
      
      <div class="py-6 px-4 sm:px-6 md:px-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = useSidebar()

const sidebarOpen = computed(() => sidebar.sidebarOpen.value)
</script>