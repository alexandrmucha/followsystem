<template>
  <UiBaseCard>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
      <label class="inline-block text-sm text-neutral-700 dark:text-neutral-300">
        {{ t('search.results.sort.label') }}
      </label>

      <UiBaseSelect size="sm" v-model="searchResults.sortBy">
        <option value="leadScore">{{ t('search.results.sort.lead_score') }}</option>
        <option value="mobileScore">{{ t('search.results.categories.performance_mobile') }}</option>
        <option value="performanceScore">{{ t('search.results.categories.performance_desktop') }}</option>
        <option value="seoScore">{{ t('search.results.categories.seo') }}</option>
        <option value="accessibilityScore">{{ t('search.results.categories.accessibility') }}</option>
        <option value="bestPracticesScore">{{ t('search.results.categories.best_practices') }}</option>
        <option value="largestContentfulPaint">{{ t('search.results.metrics.lcp') }}</option>
        <option value="totalByteWeight">{{ t('search.results.metrics.size') }}</option>
      </UiBaseSelect>
    </div>
  </UiBaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const searchResults = useSearchResultsStore()
</script>