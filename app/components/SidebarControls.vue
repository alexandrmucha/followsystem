<template>
  <!-- Mobile -->
  <button type="button" @click="sidebar.toggleMobile()" :title="mobileTitle" :aria-label="mobileTitle" class="md:hidden text-neutral-400 dark:text-neutral-500 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors px-2 py-2 rounded-lg">
    <span v-if="sidebarOpen.mobile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close-icon lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg></span>
    <span v-else><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open-icon lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg></span>
  </button>

  <!-- Desktop -->
  <button type="button" @click="sidebar.toggleDesktop()" :title="desktopTitle" :aria-label="desktopTitle" class="hidden md:inline-block text-neutral-400 dark:text-neutral-500 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors px-2 py-2 rounded-lg">
    <span v-if="sidebarOpen.desktop"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close-icon lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg></span>
    <span v-else><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open-icon lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg></span>
  </button>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const sidebar = useSidebar()

const sidebarOpen = computed(() => sidebar.sidebarOpen.value)

const mobileTitle = computed(() =>
  sidebarOpen.value.mobile
    ? t('sidebar.close')
    : t('sidebar.open')
)

const desktopTitle = computed(() =>
  sidebarOpen.value.desktop
    ? t('sidebar.close')
    : t('sidebar.open')
)
</script>