<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-6 py-12">
    <div class="max-w-sm w-full">

      <!-- mock analysis card -->
      <UiBaseCard class="mb-8">
        <div class="flex items-center justify-between gap-3 mb-4 min-w-0">
          <span class="text-xs text-neutral-500 dark:text-neutral-400 truncate" :title="error.url">{{ error.url }}</span>
          <UiBaseBadge variant="red" class="shrink-0">404</UiBaseBadge>
        </div>
        <div class="flex flex-wrap gap-2 mb-3">
          <SearchPageSpeedBadge :label="$t('search.results.categories.performance_mobile')" :score="0" />
          <SearchPageSpeedBadge :label="$t('search.results.categories.seo')" :score="0" />
          <SearchPageSpeedBadge :label="$t('search.results.categories.accessibility')" :score="0" />
        </div>
        <button class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer" @click="noteVisible = !noteVisible">
          <LucideFileText :size="13" />
          {{ noteVisible ? $t('search.results.hide_note') : $t('search.results.show_note') }}
        </button>
        <div v-if="noteVisible" class="mt-2 text-sm text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg px-3 py-2 leading-relaxed">
          {{ $t('error.ai_note') }}
        </div>
      </UiBaseCard>

      <div class="text-center">
        <p class="text-6xl font-bold text-indigo-500 mb-4">404</p>
        <h1 class="text-2xl font-bold mb-2">{{ $t('error.title') }}</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mb-8">{{ $t('error.subtitle') }}</p>
        <UiBaseButton variant="primary" size="md" @click="clearError({ redirect: '/' })">
          {{ $t('error.back_home') }}
        </UiBaseButton>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
    url?: string
  }
}>()

const noteVisible = ref(true)
</script>
