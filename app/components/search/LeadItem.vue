<template>
  <div class="py-4">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-3 md:gap-4 w-full min-w-0">

      <!-- LEFT -->
      <div class="min-w-0">
        <h3 class="truncate font-medium text-sm" :title="lead.name">{{ lead.name }}</h3>
        <a v-if="lead.phone" :href="`tel:${lead.phone}`" class="mt-1 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:underline w-fit">
          <LucidePhone :size="13" />
          {{ lead.phone }}
        </a>

        <a v-if="lead.email" :href="`mailto:${lead.email}`" class="mt-1 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:underline w-fit">
          <LucideMail :size="13" />
          {{ lead.email }}
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
          {{ $t('search.results.website') }}
        </a>

        <SearchPageSpeedBadge v-if="lead.analysisStatus === 'done'" :label="leadScoreLabel" :score="lead.leadScore" magic />
        <UiBaseBadge :variant="badgeVariant">{{ badgeText }}</UiBaseBadge>
      </div>
    </div>

    <!-- PAGESPEED BADGES -->
    <div v-if="lead.analysisStatus === 'done' && lead.hasWebsite && !isNonOperational && !isExternalPlatform" class="mt-4 flex flex-wrap gap-2">
      <SearchPageSpeedBadge :label="$t('search.results.categories.performance_mobile')" :score="lead.mobileScore" />
      <SearchPageSpeedBadge :label="$t('search.results.categories.performance_desktop')" :score="lead.performanceScore" />
      <SearchPageSpeedBadge :label="$t('search.results.categories.seo')" :score="lead.seoScore" />
      <SearchPageSpeedBadge :label="$t('search.results.categories.accessibility')" :score="lead.accessibilityScore" />
      <SearchPageSpeedBadge :label="$t('search.results.categories.best_practices')" :score="lead.bestPracticesScore" />
    </div>

    <!-- METRICS -->
    <div v-if="lead.analysisStatus === 'done' && lead.hasWebsite" class="mt-3 flex flex-wrap items-center gap-4">

        <!-- non-operational website — show only the indicator -->
        <template v-if="isNonOperational">
          <SearchMetricBadge :value="false" type="boolean" :aria-label="$t('search.results.ai.non_operational')">
            <template #icon><LucideCircleOff :size="13" /></template>
          </SearchMetricBadge>
        </template>

        <!-- external platform — show only the indicator -->
        <template v-else-if="isExternalPlatform">
          <SearchMetricBadge :value="false" type="boolean" :aria-label="$t('search.results.ai.no_own_website')">
            <template #icon><LucideGlobe :size="13" /></template>
          </SearchMetricBadge>
        </template>

        <template v-else>

        <SearchMetricBadge :value="lead.largestContentfulPaint" type="lcp" :aria-label="$t('search.results.metrics.lcp')">
          <template #icon><LucideClock :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge :value="lead.totalByteWeight" type="size" :aria-label="$t('search.results.metrics.size')">
          <template #icon><LucideHardDrive :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.hasSsl != null" :value="lead.hasSsl" type="boolean" :aria-label="lead.hasSsl ? $t('search.results.ssl.yes') : $t('search.results.ssl.no')">
          <template #icon>
            <LucideLock v-if="lead.hasSsl !== false" :size="13" />
            <LucideLockOpen v-else :size="13" />
          </template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.isResponsive != null" :value="lead.isResponsive" type="boolean" :aria-label="lead.isResponsive ? $t('search.results.ai.is_responsive') : $t('search.results.ai.not_responsive')">
          <template #icon><LucideSmartphone :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.hasThirdLevelDomain != null" :value="!lead.hasThirdLevelDomain" type="boolean" :aria-label="!lead.hasThirdLevelDomain ? $t('search.results.metrics.own_domain') : $t('search.results.metrics.third_level_domain')">
          <template #icon><LucideLink :size="13" /></template>
        </SearchMetricBadge>

        <span v-if="ctaState != null || lead.aiHasOwnWebsite != null || lead.aiUsesWebBuilder != null || lead.aiHasWebBuilderAds != null || lead.aiDesignScore != null || lead.aiCopywritingScore != null" class="w-px h-3 bg-neutral-200 dark:bg-neutral-700 self-center" />

        <SearchMetricBadge v-if="lead.aiHasOwnWebsite != null" :value="lead.aiHasOwnWebsite" type="boolean" :aria-label="lead.aiHasOwnWebsite ? $t('search.results.ai.has_own_website') : $t('search.results.ai.no_own_website')">
          <template #icon><LucideGlobe :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiUsesWebBuilder != null" :value="!lead.aiUsesWebBuilder" type="boolean" :aria-label="!lead.aiUsesWebBuilder ? $t('search.results.ai.no_web_builder') : $t('search.results.ai.uses_web_builder')">
          <template #icon><LucideBlocks :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiHasWebBuilderAds != null" :value="!lead.aiHasWebBuilderAds" type="boolean" :aria-label="!lead.aiHasWebBuilderAds ? $t('search.results.ai.no_web_builder_ads') : $t('search.results.ai.has_web_builder_ads')">
          <template #icon><LucideMegaphone :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiHasServerErrors != null" :value="!lead.aiHasServerErrors" type="boolean" :aria-label="!lead.aiHasServerErrors ? $t('search.results.ai.no_server_errors') : $t('search.results.ai.has_server_errors')">
          <template #icon><LucideServerCrash :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiHasPlaceholderContent != null" :value="!lead.aiHasPlaceholderContent" type="boolean" :aria-label="!lead.aiHasPlaceholderContent ? $t('search.results.ai.no_placeholder_content') : $t('search.results.ai.has_placeholder_content')">
          <template #icon><LucideFileQuestion :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiCopyrightYear != null" :value="lead.aiCopyrightYear" type="year" :aria-label="$t('search.results.ai.copyright_year')">
          <template #icon><LucideCopyright :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="ctaState != null" :value="ctaState" type="cta">
          <template #icon><LucideMousePointer :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiDesignScore != null" :value="lead.aiDesignScore" type="score" :aria-label="$t('search.results.ai.design')">
          <template #icon><LucidePaintbrush :size="13" /></template>
        </SearchMetricBadge>

        <SearchMetricBadge v-if="lead.aiCopywritingScore != null" :value="lead.aiCopywritingScore" type="score" :aria-label="$t('search.results.ai.copywriting')">
          <template #icon><LucidePenLine :size="13" /></template>
        </SearchMetricBadge>
        </template>
    </div>

    <!-- SCREENSHOTS -->
    <div v-if="lead.analysisStatus === 'done' && lead.hasWebsite && (lead.screenshotMobile || lead.screenshotDesktop)" class="mt-4 flex gap-3">
      <button v-if="lead.screenshotMobile" class="flex flex-col items-center gap-1 group cursor-pointer" @click="lightboxSrc = screenshotUrl(lead.screenshotMobile) ?? null">
        <div class="w-14 overflow-hidden rounded border border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors">
          <img :src="screenshotUrl(lead.screenshotMobile)" class="w-full h-auto object-cover" loading="lazy" :alt="$t('search.results.screenshot_mobile')" />
        </div>
        <span class="text-xs text-neutral-400 dark:text-neutral-500">{{ $t('search.results.screenshot_mobile') }}</span>
      </button>
      <button v-if="lead.screenshotDesktop" class="flex flex-col items-center gap-1 group cursor-pointer" @click="lightboxSrc = screenshotUrl(lead.screenshotDesktop) ?? null">
        <div class="w-24 overflow-hidden rounded border border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors">
          <img :src="screenshotUrl(lead.screenshotDesktop)" class="w-full h-auto object-cover" loading="lazy" :alt="$t('search.results.screenshot_desktop')" />
        </div>
        <span class="text-xs text-neutral-400 dark:text-neutral-500">{{ $t('search.results.screenshot_desktop') }}</span>
      </button>
    </div>

    <!-- ACTIONS (analyzed website leads) -->
    <div v-if="lead.hasWebsite && lead.analysisStatus != null" class="mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
      <button v-if="lead.aiNote" class="order-1 flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer" @click="noteVisible = !noteVisible">
        <LucideFileText :size="13" />
        {{ noteVisible ? $t('search.results.hide_note') : $t('search.results.show_note') }}
      </button>

      <div v-if="noteVisible && lead.aiNote" class="order-2 sm:order-3 sm:w-full text-sm text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg px-3 py-2 leading-relaxed">
        {{ lead.aiNote }}
      </div>

      <div class="order-3 sm:order-2 flex flex-wrap items-center gap-3 sm:ml-auto">
        <UiBaseButton variant="secondary" size="sm" class="flex items-center gap-2" :disabled="contactingLeadId === lead.id" @click="toggleContacted">
          <LucideCheck v-if="lead.contactedAt" :size="16" />
          {{ lead.contactedAt ? $t('search.results.contacted') : $t('search.results.mark_contacted') }}
        </UiBaseButton>
        <UiBaseButton v-if="lead.analysisStatus === 'done'" variant="magic" size="sm" class="flex items-center gap-2" @click="$emit('generate-email', lead)">
          <LucideSparkles :size="16" />
          {{ $t('search.results.generate_email') }}
        </UiBaseButton>
      </div>
    </div>

    <!-- ACTIONS (no website leads) -->
    <div v-if="!lead.hasWebsite" class="mt-3 flex flex-wrap sm:justify-end gap-3">
      <UiBaseButton variant="secondary" size="sm" class="flex items-center gap-2" :disabled="contactingLeadId === lead.id" @click="toggleContacted">
        <LucideCheck v-if="lead.contactedAt" :size="16" />
        {{ lead.contactedAt ? $t('search.results.contacted') : $t('search.results.mark_contacted') }}
      </UiBaseButton>
      <UiBaseButton variant="magic" size="sm" class="flex items-center gap-2" @click="$emit('generate-email', lead)">
        <LucideSparkles :size="16" />
        {{ $t('search.results.generate_email') }}
      </UiBaseButton>
    </div>


  </div>

  <UiLightBox v-if="lightboxSrc" :src="lightboxSrc" @close="lightboxSrc = null" />
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'
const props = defineProps<{ lead: BusinessLeadDTO }>()
defineEmits<{ 'generate-email': [lead: BusinessLeadDTO] }>()
const { t } = useI18n()
const { $api } = useNuxtApp()
const searchResults = useSearchResultsStore()
const config = useRuntimeConfig()

function screenshotUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined
  return `${config.public.apiBaseUrl}${path}`
}

const contactingLeadId = ref<string | null>(null)
const noteVisible = ref(false)
const lightboxSrc = ref<string | null>(null)
const alertFlow = useAlertFlow()

const toggleContacted = async () => {
  const contacted = !props.lead.contactedAt
  contactingLeadId.value = props.lead.id
  alertFlow.clear()
  try {
    await $api(`/search/leads/${props.lead.id}/contacted`, {
      method: 'PATCH',
      body: { contacted },
    })
    searchResults.setContactedAt(props.lead.id, contacted ? new Date().toISOString() : null)
  } catch {
    alertFlow.error(t('search.errors.contacted_failed'))
  } finally {
    contactingLeadId.value = null
  }
}

const leadScoreLabel = computed(() => {
  const p = props.lead.leadScore
  if (p == null) return ''
  if (p >= 35) return t('search.results.lead_score_label.excellent')
  if (p >= 25) return t('search.results.lead_score_label.good')
  if (p >= 15) return t('search.results.lead_score_label.average')
  return t('search.results.lead_score_label.weak')
})

type CtaState = 'ok' | 'missing' | 'missing_mobile' | 'missing_desktop'

const isExternalPlatform = computed(() => props.lead.aiHasOwnWebsite === false)
const isNonOperational = computed(() => props.lead.aiWebsiteNonOperational === true)

const ctaState = computed((): CtaState | null => {
  const mobile = props.lead.aiMissingCtaMobile
  const desktop = props.lead.aiMissingCtaDesktop
  if (mobile == null && desktop == null) return null
  if (mobile === false && desktop === false) return 'ok'
  if (mobile === true && desktop === true) return 'missing'
  if (mobile === true) return 'missing_mobile'
  return 'missing_desktop'
})

const badgeVariant = computed((): 'neutral' | 'emerald' | 'blue' | 'amber' | 'red' => {
  if (!props.lead.hasWebsite) return 'neutral'
  if (props.lead.analysisStatus === 'done') return 'emerald'
  if (props.lead.analysisStatus === 'analyzing') return 'blue'
  if (props.lead.analysisStatus === 'error') return 'red'
  if (props.lead.analysisStatus === 'canceled') return 'neutral'
  return 'amber'
})

const badgeText = computed(() => {
  if (!props.lead.hasWebsite) return t('search.results.badge.no_website')
  if (props.lead.analysisStatus === 'done') return t('search.results.badge.done')
  if (props.lead.analysisStatus === 'analyzing') return t('search.results.badge.analyzing')
  if (props.lead.analysisStatus === 'error') return t('search.results.badge.error')
  if (props.lead.analysisStatus === 'canceled') return t('search.results.badge.canceled')
  return t('search.results.badge.pending')
})
</script>