<template>
  <div class="fixed left-0 top-0 h-full z-30 bg-white dark:bg-neutral-900 border-e border-gray-200 dark:border-neutral-800 w-full max-w-64 transition-transform duration-300" :class="[ sidebarOpen.desktop ? 'md:translate-x-0' : 'md:-translate-x-full', sidebarOpen.mobile ? 'translate-x-0' : '-translate-x-full']">
    <button type="button" @click="sidebar.closeMobile()" :title="$t('sidebar.close')" :aria-label="$t('sidebar.close')" class="md:hidden absolute top-4 right-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg p-0.75 transition-colors cursor-pointer">
      <LucideX :size="20" />
    </button>

    <div class="p-6">
      <UiLogo />

      <nav class="mt-8 space-y-1">
        <LayoutNavigationItem to="/dashboard">
          <template #icon>
            <LucideGauge :size="20" />
          </template>

          {{ $t('nav.dashboard') }}
        </LayoutNavigationItem>

        <LayoutNavigationItem to="/search">
          <template #icon>
            <LazyLucideMapPinSearch :size="20" />
          </template>

          {{ $t('nav.search') }}
        </LayoutNavigationItem>
      </nav>

    </div>

  </div>
</template>

<script lang="ts" setup>
const sidebar = useSidebar()

const sidebarOpen = computed(() => sidebar.sidebarOpen.value)
</script>