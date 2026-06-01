import type { BusinessLeadDTO } from '~/types/business-lead.dto'

export function useSearchResults() {
  const { t } = useI18n()
  const searchResults = useSearchResultsStore()
  const { streamSession } = useAnalysisStream()

  const sortBy = ref<keyof Pick<BusinessLeadDTO, 'mobileScore' | 'performanceScore' | 'seoScore' | 'accessibilityScore' | 'bestPracticesScore'>>('mobileScore')

  const searched = computed(() => searchResults.searched)
  const analyzing = computed(() => searchResults.analyzing)

  const websiteLeadsCount = computed(() => searchResults.leads.filter(l => l.hasWebsite).length)

  const analyzedCount = computed(() =>
    searchResults.leads.filter(l => l.analysisStatus === 'done' || l.analysisStatus === 'error').length
  )

  const progressPercent = computed(() => {
    if (!websiteLeadsCount.value) return 100
    return Math.round((analyzedCount.value / websiteLeadsCount.value) * 100)
  })

  const leads = computed(() => {
    const rawLeads = [...searchResults.leads]

    if (searchResults.analyzing) return rawLeads

    return rawLeads.sort((a, b) => {
      if (!a.hasWebsite && b.hasWebsite) return 1
      if (a.hasWebsite && !b.hasWebsite) return -1

      const scoreA = a[sortBy.value] ?? 100
      const scoreB = b[sortBy.value] ?? 100
      return (scoreA as number) - (scoreB as number)
    })
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

  return {
    sortBy,
    searched,
    analyzing,
    leads,
    websiteLeadsCount,
    analyzedCount,
    progressPercent,
    estimatedTimeText,
  }
}