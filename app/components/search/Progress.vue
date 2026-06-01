<template>
  <UiBaseCard>
    <div class="flex items-center justify-between mb-2">
      <p class="text-sm text-neutral-600 dark:text-neutral-300">
        {{ t('search.results.progress.label', { done: analyzedCount, total: websiteLeadsCount }) }}
      </p>
      <p class="text-xs text-neutral-500 dark:text-neutral-400">
        {{ progressPercent }}%
      </p>
    </div>

    <div class="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      <div
        class="h-full bg-indigo-500 transition-all duration-500"
        :style="{ width: progressPercent + '%' }"
      />
    </div>

    <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
      {{ estimatedTimeText }}
    </p>
  </UiBaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { analyzedCount, websiteLeadsCount, progressPercent, estimatedTimeText } = useSearchResults()
</script>