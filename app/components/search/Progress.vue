<template>
  <UiBaseCard>
    <div class="flex items-center justify-between mb-2">
      <p class="text-sm text-neutral-600 dark:text-neutral-300">
        {{ t('search.results.progress.label', { done: searchResults.analyzedCount, total: searchResults.websiteLeadsCount }) }}
      </p>
      <p class="text-xs text-neutral-500 dark:text-neutral-400">
        {{ searchResults.progressPercent }}%
      </p>
    </div>

    <div class="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      <div
        class="h-full bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 transition-all duration-500"
        :style="{ width: searchResults.progressPercent + '%' }"
      />
    </div>

    <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
      {{ estimatedTimeText }}
    </p>

    <p v-if="searchResults.sessionStatus === 'analyzing'" class="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
      {{ t('search.results.progress.sort_hint') }}
    </p>
  </UiBaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const searchResults = useSearchResultsStore()

const estimatedTimeText = computed(() => {
  if (searchResults.progressPercent === 100) return t('search.results.progress.done')
  if (searchResults.sessionStatus === 'cancelled') return t('search.results.progress.paused')
  if (searchResults.sessionStatus === 'cancelling') return t('search.results.progress.cancelling')

  const remaining = searchResults.websiteLeadsCount - searchResults.analyzedCount
  const seconds = remaining * 5
  const minutes = Math.ceil(seconds / 60)

  return t('search.results.progress.estimating', { minutes })
})
</script>