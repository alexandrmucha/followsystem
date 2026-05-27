<template>
  <!-- Mobile -->
  <button type="button" @click="sidebar.toggleMobile()" :title="mobileTitle" :aria-label="mobileTitle" class="md:hidden text-neutral-400 dark:text-neutral-500 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors px-2 py-2 rounded-lg">
    <LucidePanelLeftClose v-if="sidebarOpen.mobile" :size="24" />
    <LucidePanelLeftOpen v-else :size="24" />
  </button>

  <!-- Desktop -->
  <button type="button" @click="sidebar.toggleDesktop()" :title="desktopTitle" :aria-label="desktopTitle" class="hidden md:inline-block text-neutral-400 dark:text-neutral-500 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors px-2 py-2 rounded-lg">
   <LucidePanelLeftClose v-if="sidebarOpen.desktop" :size="24" />
    <LucidePanelLeftOpen v-else :size="24" />
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