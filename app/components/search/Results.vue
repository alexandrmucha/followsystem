<template>
  <div v-if="searched && !leads.length" class="mt-8">
    <UiBaseCard>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 text-center">
        {{ t('search.results.empty') }}
      </p>
    </UiBaseCard>
  </div>

  <div class="mt-8 space-y-6" v-if="leads.length">

    <!-- PROGRESS -->
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

    <!-- LIST -->
    <UiBaseCard>
      <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <div v-for="lead in leads" :key="lead.id" class="py-4">

          <div class="flex items-center justify-between gap-4">
            <!-- LEFT -->
            <div class="min-w-0 flex-1">
              <h3 class="truncate font-medium text-sm">
                {{ lead.name }}
              </h3>
              <p v-if="lead.address" class="mt-1 truncate text-sm text-neutral-500 dark:text-neutral-400">
                {{ lead.address }}
              </p>
            </div>

            <!-- RIGHT -->
            <div class="flex items-center gap-4 shrink-0">
              <span v-if="lead.rating !== null" class="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
                <LucideStar :size="16" />
                <span>{{ lead.rating }}</span>
                <span class="text-neutral-400 dark:text-neutral-500">
                  ({{ lead.reviewCount }})
                </span>
              </span>

              <a v-if="lead.website" :href="lead.website" target="_blank" class="text-sm hover:underline">
                {{ t('search.results.website') }}
              </a>

              <div :class="badgeClass(lead)">
                {{ badgeText(lead) }}
              </div>
            </div>
          </div>

          <div v-if="lead.analysisStatus === 'done'" class="mt-3 flex flex-wrap gap-2">
            <SearchPageSpeedBadge label="Performance (Mobile)" :score="null" />
            <SearchPageSpeedBadge label="Performance (Desktop)" :score="lead.performanceScore" />
            <SearchPageSpeedBadge label="SEO" :score="lead.seoScore" />
            <SearchPageSpeedBadge label="Accessibility" :score="lead.accessibilityScore" />
            <SearchPageSpeedBadge label="Best Practices" :score="lead.bestPracticesScore" />
          </div>

        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
        <p class="text-[10px] tracking-wide text-neutral-400 dark:text-neutral-500 uppercase font-medium select-none">
          Powered by Google
        </p>
      </div>
    </UiBaseCard>

  </div>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

const { t } = useI18n()
const searchResults = useSearchResultsStore()
const { streamSession } = useAnalysisStream()

const leads = computed(() => searchResults.leads)
const searched = computed(() => searchResults.searched)

const websiteLeadsCount = computed(() => leads.value.filter(l => l.hasWebsite).length)

const analyzedCount = computed(() =>
  leads.value.filter(l => l.analysisStatus === 'done' || l.analysisStatus === 'error').length
)

const progressPercent = computed(() => {
  if (!websiteLeadsCount.value) return 100
  return Math.round((analyzedCount.value / websiteLeadsCount.value) * 100)
})

const estimatedTimeText = computed(() => {
  if (progressPercent.value === 100) return t('search.results.progress.done')

  const remaining = websiteLeadsCount.value - analyzedCount.value
  const seconds = remaining * 30
  const minutes = Math.ceil(seconds / 60)

  return t('search.results.progress.estimating', { minutes })
})

watch(() => searchResults.sessionId, (sessionId) => {
  if (!sessionId) return
  if (!searchResults.analyzing) return

  streamSession(sessionId, (update) => {
    searchResults.updateAnalysis(update.leadId, {
      status: update.status,
      performanceScore: update.performanceScore,
      mobileScore: update.mobileScore,
      seoScore: update.seoScore,
      accessibilityScore: update.accessibilityScore,
      bestPracticesScore: update.bestPracticesScore,
    })
  })
}, { immediate: true })

function badgeClass(lead: BusinessLeadDTO) {
  const base = 'rounded-full px-2.5 py-1 text-xs font-medium'
  if (!lead.hasWebsite) return `${base} bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400`
  if (lead.analysisStatus === 'done') return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200`
  if (lead.analysisStatus === 'analyzing') return `${base} bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200`
  if (lead.analysisStatus === 'error') return `${base} bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200`
  return `${base} bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200`
}

function badgeText(lead: BusinessLeadDTO) {
  if (!lead.hasWebsite) return t('search.results.badge.no_website')
  if (lead.analysisStatus === 'done') return t('search.results.badge.done')
  if (lead.analysisStatus === 'analyzing') return t('search.results.badge.analyzing')
  if (lead.analysisStatus === 'error') return t('search.results.badge.error')
  return t('search.results.badge.pending')
}


</script>