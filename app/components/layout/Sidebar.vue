<template>
  <div class="fixed left-0 top-0 h-full z-30 bg-white dark:bg-neutral-900 border-e border-neutral-200 dark:border-neutral-800 w-full max-w-64 transition-transform duration-300" :class="[ sidebarOpen.desktop ? 'md:translate-x-0' : 'md:-translate-x-full', sidebarOpen.mobile ? 'translate-x-0' : '-translate-x-full']">
    <button type="button" @click="sidebar.closeMobile()" :title="$t('sidebar.close')" :aria-label="$t('sidebar.close')" class="md:hidden absolute top-4 right-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg p-0.75 transition-colors cursor-pointer">
      <LucideX :size="20" />
    </button>

    <div class="p-6 flex flex-col h-full">
      <NuxtLink to="/"><UiLogo /></NuxtLink>

      <nav class="mt-8 space-y-1">
        <LayoutNavigationItem to="/search">
          <template #icon>
            <LazyLucideMapPinSearch :size="20" />
          </template>

          {{ $t('nav.search') }}
        </LayoutNavigationItem>

        <LayoutNavigationItem to="/history">
          <template #icon>
            <LazyLucideHistory :size="20" />
          </template>

          {{ $t('nav.history') }}
        </LayoutNavigationItem>

        <LayoutNavigationItem to="/templates">
          <template #icon>
            <LazyLucideFileText :size="20" />
          </template>

          {{ $t('nav.templates') }}
        </LayoutNavigationItem>
      </nav>

      <div class="mt-auto pt-6 space-y-4">
        <div v-if="credits">
          <div class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
            <span class="flex items-center gap-1.5">
              <LucideZap :size="13" />
              {{ $t('nav.credits') }}
            </span>
            <span>{{ Math.round((credits.remaining / credits.limit) * 100) }}%</span>
          </div>
          <div class="h-1 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <div
              class="h-full bg-linear-to-r from-indigo-500 to-purple-600 transition-all duration-500"
              :style="{ width: Math.round((credits.remaining / credits.limit) * 100) + '%' }"
            />
          </div>
        </div>

        <a href="mailto:support@fulply.com" class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
          <LucideLifeBuoy :size="13" />
          {{ $t('nav.support') }}
        </a>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
const sidebar = useSidebar()
const { $api } = useNuxtApp()

const sidebarOpen = computed(() => sidebar.sidebarOpen.value)

const { data: credits } = await useAsyncData('credits-usage', () =>
  $api<{ limit: number; remaining: number }>('/credits/usage')
)

</script>