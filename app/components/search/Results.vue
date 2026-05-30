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
        {{ progressPercent === 100 ? t('search.results.progress.done') : t('search.results.progress.estimating') }}
      </p>
    </UiBaseCard>

    <!-- LIST -->
    <UiBaseCard>
      <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <div v-for="lead in leads" :key="lead.id" class="flex items-center justify-between gap-4 py-4">

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
      </div>
    </UiBaseCard>

  </div>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

const { t } = useI18n()
const { $api } = useNuxtApp()
const searchResults = useSearchResultsStore()
const { streamSession } = useAnalysisStream()

const leads = computed(() => searchResults.leads)
const searched = computed(() => searchResults.searched)

const websiteLeadsCount = computed(() => leads.value.filter(l => l.hasWebsite).length)
const analyzedCount = computed(() => leads.value.filter(l => l.analysisStatus === 'done').length)

const progressPercent = computed(() => {
  if (!websiteLeadsCount.value) return 100
  return Math.round((analyzedCount.value / websiteLeadsCount.value) * 100)
})

watch(() => searchResults.sessionId, (sessionId) => {
  if (!sessionId) return
  if (!searchResults.analyzing) return

  streamSession(sessionId, (update) => {
    searchResults.updateAnalysisStatus(update.leadId, update.status)
  })
}, { immediate: true })

const { data: latestSession } = await useAsyncData('latest-session', () =>
  $api<{ sessionId: string, leads: BusinessLeadDTO[] } | null>('/search/latest')
)

if (latestSession.value && !searchResults.leads.length) {
  searchResults.setSession(latestSession.value.sessionId)
  searchResults.setLeads(latestSession.value.leads)
}

function badgeClass(lead: BusinessLeadDTO) {
  const base = 'rounded-full px-2.5 py-1 text-xs font-medium'
  if (!lead.hasWebsite) return `${base} bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400`
  if (lead.analysisStatus === 'done') return `${base} bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200`
  if (lead.analysisStatus === 'analyzing') return `${base} bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200`
  return `${base} bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200`
}

function badgeText(lead: BusinessLeadDTO) {
  if (!lead.hasWebsite) return t('search.results.badge.no_website')
  if (lead.analysisStatus === 'done') return t('search.results.badge.done')
  if (lead.analysisStatus === 'analyzing') return t('search.results.badge.analyzing')
  return t('search.results.badge.pending')
}
</script>