<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold mb-2">
      {{ $t('search.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('search.description') }}
    </p>

    <p v-if="sessionError" :class="[systemErrorClass, 'text-center py-8']">{{ $t('search.errors.load') }}</p>
    <template v-else>
      <SearchForm />
      <SearchResults />
    </template>

  </div>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'
import { systemErrorClass } from '~/utils/ui'

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

const route = useRoute()
const alertFlow = useAlertFlow()

onMounted(() => {
  if (route.query.restored === '1') {
    alertFlow.success(t('account_deletion.restored'))
  }
})

const sessionParam = route.params.sessionId as string | undefined

const { data: sessionData, error: sessionError } = await useAsyncData(sessionParam ? `session-${sessionParam}` : 'latest-session', () =>
  $api<{
    id: string
    sessionStatus: string
    industry: string
    location: string
    leads: BusinessLeadDTO[]
  } | null>(sessionParam ? `/search/sessions/${sessionParam}` : '/search/latest')
)

if (sessionData.value) {
  searchResults.setSession(sessionData.value.id)
  searchResults.setSessionStatus(sessionData.value.sessionStatus)
  searchResults.setLeads(sessionData.value.leads)
  searchDraft.industry = sessionData.value.industry
  searchDraft.location = sessionData.value.location
}

let closeStream: (() => void) | undefined | void

watch(() => searchResults.sessionStatus, (sessionStatus) => {
  if (sessionStatus !== 'analyzing' && sessionStatus !== 'cancelling') return
  if (!searchResults.sessionId) return

  closeStream?.()

  closeStream = streamSession(searchResults.sessionId, (update) => {
    searchResults.updateAnalysis(update.leadId, {
      status: update.status,
      performanceScore: update.performanceScore,
      mobileScore: update.mobileScore,
      seoScore: update.seoScore,
      accessibilityScore: update.accessibilityScore,
      bestPracticesScore: update.bestPracticesScore,
      largestContentfulPaint: update.largestContentfulPaint,
      totalByteWeight: update.totalByteWeight,
      hasSsl: update.hasSsl,
      email: update.email,
      isResponsive: update.isResponsive,
      aiMissingCtaMobile: update.aiMissingCtaMobile,
      aiMissingCtaDesktop: update.aiMissingCtaDesktop,
      aiDesignScore: update.aiDesignScore,
      aiCopywritingScore: update.aiCopywritingScore,
      aiHasOwnWebsite: update.aiHasOwnWebsite,
      hasThirdLevelDomain: update.hasThirdLevelDomain,
      aiUsesWebBuilder: update.aiUsesWebBuilder,
      aiHasWebBuilderAds: update.aiHasWebBuilderAds,
      leadScore: update.leadScore,
    })
  }, (sessionStatus) => {
    searchResults.setSessionStatus(sessionStatus)
  })
}, { immediate: true })

onUnmounted(() => {
  closeStream?.()
})
</script>