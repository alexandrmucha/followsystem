<template>
  <div class="py-4">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-3 md:gap-4 w-full min-w-0">

      <!-- LEFT -->
      <div class="min-w-0">
        <h3 class="truncate font-medium text-sm" :title="lead.name">{{ lead.name }}</h3>
        <p v-if="lead.address" class="mt-1 truncate text-sm text-neutral-500 dark:text-neutral-400" :title="lead.address">
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

        <SearchPageSpeedBadge v-if="lead.analysisStatus === 'done' || !lead.hasWebsite" :label="t('search.results.sort.lead_score')" :score="leadScorePercent" magic />
        <UiBaseBadge :variant="badgeVariant">{{ badgeText }}</UiBaseBadge>
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
    <div v-if="lead.analysisStatus === 'done'" class="mt-3 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-4">
        <SearchMetricBadge :value="lead.largestContentfulPaint" type="lcp" :aria-label="t('search.results.metrics.lcp')">
          <template #icon><LucideClock :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge :value="lead.totalByteWeight" type="size" :aria-label="t('search.results.metrics.size')">
          <template #icon><LucideHardDrive :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge :value="sslValue" type="ssl" :aria-label="sslAriaLabel">
          <template #icon>
            <LucideLock v-if="sslValue !== false" :size="13" />
            <LucideLockOpen v-else :size="13" />
          </template>
        </SearchMetricBadge>

        <span v-if="lead.aiMissingCtaMobile != null || lead.aiMissingCtaDesktop != null || lead.aiHasPoorMobileDesign != null || lead.aiHasPoorDesign != null" class="w-px h-3 bg-neutral-200 dark:bg-neutral-700 self-center" />

        <SearchMetricBadge v-if="lead.aiMissingCtaMobile != null" :value="lead.aiMissingCtaMobile" type="ai" :aria-label="lead.aiMissingCtaMobile ? t('search.results.ai.missing_cta_mobile') : t('search.results.ai.has_cta_mobile')">
          <template #icon><LucideMousePointer :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiMissingCtaDesktop != null" :value="lead.aiMissingCtaDesktop" type="ai" :aria-label="lead.aiMissingCtaDesktop ? t('search.results.ai.missing_cta_desktop') : t('search.results.ai.has_cta_desktop')">
          <template #icon><LucideMousePointer :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiHasPoorMobileDesign != null" :value="lead.aiHasPoorMobileDesign" type="ai" :aria-label="lead.aiHasPoorMobileDesign ? t('search.results.ai.poor_mobile_design') : t('search.results.ai.good_mobile_design')">
          <template #icon><LucideSmartphone :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiHasPoorDesign != null" :value="lead.aiHasPoorDesign" type="ai" :aria-label="lead.aiHasPoorDesign ? t('search.results.ai.poor_design') : t('search.results.ai.good_design')">
          <template #icon><LucidePaintbrush :size="13" /></template>
        </SearchMetricBadge>

      </div>

      <UiBaseButton variant="magic" size="sm" class="flex items-center gap-2" @click="$emit('generate-email', lead)">
        <LucideSparkles :size="16" />
        {{ t('search.results.generate_email') }}
      </UiBaseButton>
    </div>

    <div v-else-if="!lead.hasWebsite" class="mt-3 flex sm:justify-end">
      <UiBaseButton variant="magic" size="sm" class="flex items-center gap-2" @click="$emit('generate-email', lead)">
        <LucideSparkles :size="16" />
        {{ t('search.results.generate_email') }}
      </UiBaseButton>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'
import { computeLeadScore, LEAD_SCORE_MAX } from '~/stores/searchResults'

const props = defineProps<{ lead: BusinessLeadDTO }>()
defineEmits<{ 'generate-email': [lead: BusinessLeadDTO] }>()
const { t } = useI18n()

const leadScorePercent = computed(() =>
  Math.min(100, Math.round(computeLeadScore(props.lead) / LEAD_SCORE_MAX * 100))
)

const sslValue = computed(() => {
  if (props.lead.hasSsl == null) return undefined
  if (!props.lead.hasSsl) return false
  if (props.lead.hasHttpsRedirect === false) return null
  return true
})

const sslAriaLabel = computed(() => {
  if (sslValue.value === null) return t('search.results.ssl.no_redirect')
  if (sslValue.value === false) return t('search.results.ssl.no')
  if (sslValue.value === true) return t('search.results.ssl.yes')
  return ''
})

const badgeVariant = computed((): 'neutral' | 'emerald' | 'blue' | 'amber' | 'red' => {
  if (!props.lead.hasWebsite) return 'neutral'
  if (props.lead.analysisStatus === 'done') return 'emerald'
  if (props.lead.analysisStatus === 'analyzing') return 'blue'
  if (props.lead.analysisStatus === 'error') return 'red'
  if (props.lead.analysisStatus === 'cancelled') return 'neutral'
  return 'amber'
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