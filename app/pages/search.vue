<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold mb-2">
      {{ $t('search.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('search.description') }}
    </p>

    <SearchForm />
    <SearchResults />

  </div>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

const { t } = useI18n()
const searchResults = useSearchResultsStore()
const searchDraft = useSearchDraftStore()
const { $api } = useNuxtApp()
const { streamSession } = useAnalysisStream()

useHead({
  title: t('nav.search')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { data: latestSession } = await useAsyncData('latest-session', () =>
  $api<{
    sessionId: string
    industry: string
    location: string
    leads: BusinessLeadDTO[]
  } | null>('/search/latest')
)

if (latestSession.value) {
  searchResults.setSession(latestSession.value.sessionId)
  searchResults.setLeads(latestSession.value.leads)
  searchDraft.industry = latestSession.value.industry
  searchDraft.location = latestSession.value.location
}

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
</script>