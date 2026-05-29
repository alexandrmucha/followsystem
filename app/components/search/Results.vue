<template>
  <div class="mt-6" v-if="leads.length">
    <UiBaseCard>

      <!-- LIST -->
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
const searchResults = useSearchResultsStore()
const { streamSession } = useAnalysisStream()

const leads = computed(() => searchResults.leads)

watch(() => searchResults.sessionId, (sessionId) => {
  if (!sessionId) return

  streamSession(sessionId, (update) => {
    searchResults.updateAnalysisStatus(update.leadId, update.status)
  })
}, { immediate: true })

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