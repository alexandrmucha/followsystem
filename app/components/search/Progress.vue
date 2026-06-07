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

    <div v-if="searchResults.sessionStatus === 'done' || searchResults.sessionStatus === 'cancelled'" class="mt-3 flex justify-end">
      <UiBaseButton variant="secondary" size="sm" class="flex items-center gap-2" :disabled="exporting" @click="exportCsv">
        <LucideDownload :size="16" />
        {{ t('search.results.export_csv') }}
      </UiBaseButton>
    </div>
  </UiBaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const searchResults = useSearchResultsStore()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()

const exporting = ref(false)

const exportCsv = async () => {
  if (!searchResults.sessionId) return
  exporting.value = true
  alertFlow.clear()
  try {
    const blob = await $api<Blob>(`/search/sessions/${searchResults.sessionId}/export`, {
      responseType: 'blob',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${searchResults.sessionId}.csv`
    a.click()
    URL.revokeObjectURL(url)
  } catch {
    alertFlow.error(t('search.errors.export_failed'))
  } finally {
    exporting.value = false
  }
}

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