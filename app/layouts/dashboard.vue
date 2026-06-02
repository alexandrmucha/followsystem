<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex">
    <LayoutSidebar />

    <div class="flex flex-col grow transition-[margin] duration-300" :class="sidebarOpen.desktop ? 'md:ml-64' : 'ml-0'">
      <div class="sticky top-0 z-20">
        <LayoutAnnouncements />
        <LayoutHeader />
      </div>
      
      <div class="flex flex-col grow py-6 px-4 sm:px-6 md:px-8">
        <LayoutAlerts />

        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = useSidebar()

const sidebarOpen = computed(() => sidebar.sidebarOpen.value)
</script>