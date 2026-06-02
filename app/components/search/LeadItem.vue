<template>
  <div class="py-4">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-3 md:gap-4 w-full min-w-0">

      <!-- LEFT -->
      <div class="min-w-0">
        <h3 class="truncate font-medium text-sm">{{ lead.name }}</h3>
        <p v-if="lead.address" class="mt-1 truncate text-sm text-neutral-500 dark:text-neutral-400">
          {{ lead.address }}
        </p>
        
        <a v-if="lead.phone" :href="`tel:${lead.phone}`" class="mt-1 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:underline w-fit">
          <LucidePhone :size="13" />
          {{ lead.phone }}
        </a>
      </div>

      <!-- RIGHT -->
      <div class="flex flex-wrap items-center gap-3 md:justify-end w-full md:w-auto">
        <span v-if="lead.rating !== null" class="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
          <LucideStar :size="16" />
          <span>{{ lead.rating }}</span>
          <span class="text-neutral-400 dark:text-neutral-500">({{ lead.reviewCount }})</span>
        </span>

        <a v-if="lead.website" :href="lead.website" target="_blank" class="text-sm hover:underline">
          {{ t('search.results.website') }}
        </a>

        <div :class="badgeClass">{{ badgeText }}</div>
      </div>
    </div>

    <!-- PAGESPEED BADGES -->
    <div v-if="lead.analysisStatus === 'done'" class="mt-4 flex flex-wrap gap-2">
      <SearchPageSpeedBadge :label="t('search.results.categories.performance_mobile')" :score="lead.mobileScore" />
      <SearchPageSpeedBadge :label="t('search.results.categories.performance_desktop')" :score="lead.performanceScore" />
      <SearchPageSpeedBadge :label="t('search.results.categories.seo')" :score="lead.seoScore" />
      <SearchPageSpeedBadge :label="t('search.results.categories.accessibility')" :score="lead.accessibilityScore" />
      <SearchPageSpeedBadge :label="t('search.results.categories.best_practices')" :score="lead.bestPracticesScore" />
    </div>

    <!-- METRICS -->
    <div v-if="lead.analysisStatus === 'done'" class="mt-3 flex flex-wrap items-center gap-4">
      <SearchMetricBadge :value="lead.largestContentfulPaint" type="lcp" :aria-label="t('search.results.metrics.lcp')">
        <template #icon><LucideClock :size="13" /></template>
      </SearchMetricBadge>

      <SearchMetricBadge :value="lead.totalByteWeight" type="size" :aria-label="t('search.results.metrics.size')">
        <template #icon><LucideHardDrive :size="13" /></template>
      </SearchMetricBadge>

      <SearchMetricBadge :value="lead.hasSsl" type="ssl" :aria-label="lead.hasSsl ? t('search.results.ssl.yes') : t('search.results.ssl.no')">
        <template #icon>
          <LucideLock v-if="lead.hasSsl" :size="13" />
          <LucideLockOpen v-else :size="13" />
        </template>
      </SearchMetricBadge>

      <SearchMetricBadge :value="lead.isResponsive" type="responsive" :aria-label="t('search.results.metrics.responsive')">
        <template #icon><LucideSmartphone :size="13" /></template>
      </SearchMetricBadge>

      <SearchMetricBadge :value="lead.hasViewport" type="viewport" :aria-label="t('search.results.metrics.viewport')">
        <template #icon><LucideCode2 :size="13" /></template>
      </SearchMetricBadge>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

const props = defineProps<{ lead: BusinessLeadDTO }>()
const { t } = useI18n()

const badgeClass = computed(() => {
  const base = 'rounded-full px-2.5 py-1 text-xs font-medium select-none'
  if (!props.lead.hasWebsite) return `${base} bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400`
  if (props.lead.analysisStatus === 'done') return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300`
  if (props.lead.analysisStatus === 'analyzing') return `${base} bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300`
  if (props.lead.analysisStatus === 'error') return `${base} bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300`
  if (props.lead.analysisStatus === 'cancelled') return `${base} bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400`
  return `${base} bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300`
})

const badgeText = computed(() => {
  if (!props.lead.hasWebsite) return t('search.results.badge.no_website')
  if (props.lead.analysisStatus === 'done') return t('search.results.badge.done')
  if (props.lead.analysisStatus === 'analyzing') return t('search.results.badge.analyzing')
  if (props.lead.analysisStatus === 'error') return t('search.results.badge.error')
  if (props.lead.analysisStatus === 'cancelled') return t('search.results.badge.cancelled')
  return t('search.results.badge.pending')
})
</script>