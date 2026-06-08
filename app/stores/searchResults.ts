import { defineStore } from 'pinia'
import type { BusinessLeadDTO } from '~/types/business-lead.dto'


export const useSearchResultsStore = defineStore('searchResults', () => {
  const sessionId = ref<string | null>(null)
  const sessionStatus = ref<string | null>(null)
  const leads = ref<BusinessLeadDTO[]>([])
  const searched = ref(false)

  type SortOption = 'leadScore' | keyof Pick<BusinessLeadDTO, 'mobileScore' | 'performanceScore' | 'seoScore' | 'accessibilityScore' | 'bestPracticesScore' | 'largestContentfulPaint' | 'totalByteWeight'>

  const sortBy = ref<SortOption>('leadScore')

  function setSession(id: string) {
    sessionId.value = id
  }

  function setSessionStatus(status: string) {
    sessionStatus.value = status
  }

  function setLeads(data: BusinessLeadDTO[]) {
    leads.value = data
    searched.value = true
  }

  function setContactedAt(leadId: string, contactedAt: string | null) {
    const lead = leads.value.find(l => l.id === leadId)
    if (lead) lead.contactedAt = contactedAt
  }

  function clear() {
    sessionId.value = null
    sessionStatus.value = null
    leads.value = []
    searched.value = false
  }

  function updateAnalysis(leadId: string, data: {
    status: NonNullable<BusinessLeadDTO['analysisStatus']>
    performanceScore?: number | null
    mobileScore?: number | null
    seoScore?: number | null
    accessibilityScore?: number | null
    bestPracticesScore?: number | null
    largestContentfulPaint?: number | null
    totalByteWeight?: number | null
    hasSsl?: boolean | null
    email?: string | null
    isResponsive?: boolean | null
    aiMissingCtaMobile?: boolean | null
    aiMissingCtaDesktop?: boolean | null
    aiDesignScore?: number | null
    aiCopywritingScore?: number | null
    aiHasOwnWebsite?: boolean | null
    hasThirdLevelDomain?: boolean | null
    aiUsesWebBuilder?: boolean | null
    aiHasWebBuilderAds?: boolean | null
    aiHasServerErrors?: boolean | null
    aiHasPlaceholderContent?: boolean | null
    aiCopyrightYear?: number | null
    aiWebsiteNonOperational?: boolean | null
    leadScore?: number | null
    aiNote?: string | null
  }) {
    const lead = leads.value.find(l => l.id === leadId)
    if (lead) {
      lead.analysisStatus = data.status
      lead.performanceScore = data.performanceScore
      lead.mobileScore = data.mobileScore
      lead.seoScore = data.seoScore
      lead.accessibilityScore = data.accessibilityScore
      lead.bestPracticesScore = data.bestPracticesScore
      lead.largestContentfulPaint = data.largestContentfulPaint
      lead.totalByteWeight = data.totalByteWeight
      lead.hasSsl = data.hasSsl
      lead.email = data.email
      lead.isResponsive = data.isResponsive
      lead.aiMissingCtaMobile = data.aiMissingCtaMobile
      lead.aiMissingCtaDesktop = data.aiMissingCtaDesktop
      lead.aiDesignScore = data.aiDesignScore
      lead.aiCopywritingScore = data.aiCopywritingScore
      lead.aiHasOwnWebsite = data.aiHasOwnWebsite
      lead.hasThirdLevelDomain = data.hasThirdLevelDomain
      lead.aiUsesWebBuilder = data.aiUsesWebBuilder
      lead.aiHasWebBuilderAds = data.aiHasWebBuilderAds
      lead.aiHasServerErrors = data.aiHasServerErrors
      lead.aiHasPlaceholderContent = data.aiHasPlaceholderContent
      lead.aiCopyrightYear = data.aiCopyrightYear
      lead.aiWebsiteNonOperational = data.aiWebsiteNonOperational
      lead.leadScore = data.leadScore
      lead.aiNote = data.aiNote
    }
  }

  const websiteLeadsCount = computed(() => leads.value.filter(l => l.hasWebsite).length)

  const analyzedCount = computed(() =>
    leads.value.filter(l =>
      l.hasWebsite && (l.analysisStatus === 'done' || l.analysisStatus === 'error')
    ).length
  )

  const progressPercent = computed(() => {
    if (!websiteLeadsCount.value) return 100
    return Math.round((analyzedCount.value / websiteLeadsCount.value) * 100)
  })

  function computeLeadTiebreaker(lead: BusinessLeadDTO): number {
    if (lead.analysisStatus !== 'done') return 100
    if (!lead.hasWebsite) return -30
    if (lead.aiWebsiteNonOperational === true) return -20
    if (lead.aiHasOwnWebsite === false) return -10

    const weights = [
      { value: lead.mobileScore, weight: 3 },
      { value: lead.seoScore, weight: 2 },
      { value: lead.performanceScore, weight: 2 },
      { value: lead.accessibilityScore, weight: 1 },
      { value: lead.bestPracticesScore, weight: 1 },
    ]

    const available = weights.filter(w => w.value != null) as { value: number; weight: number }[]
    if (!available.length) return 100

    const totalWeight = available.reduce((sum, w) => sum + w.weight, 0)
    return available.reduce((sum, w) => sum + w.value * w.weight, 0) / totalWeight
  }

  const sortedLeads = computed(() => {
    const rawLeads = [...leads.value]

    if (sessionStatus.value === 'analyzing' || sessionStatus.value === 'canceling') return rawLeads

    if (sortBy.value === 'leadScore') {
      return rawLeads.sort((a, b) => {
        const scoreDiff = (b.leadScore ?? 0) - (a.leadScore ?? 0)
        if (scoreDiff !== 0) return scoreDiff
        return computeLeadTiebreaker(a) - computeLeadTiebreaker(b)
      })
    }

    const isMetric = sortBy.value === 'largestContentfulPaint' || sortBy.value === 'totalByteWeight'

    return rawLeads.sort((a, b) => {
      if (!a.hasWebsite && b.hasWebsite) return 1
      if (a.hasWebsite && !b.hasWebsite) return -1

      const key = sortBy.value as keyof BusinessLeadDTO
      const aVal = a[key]
      const bVal = b[key]

      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      if (isMetric) return (bVal as number) - (aVal as number)
      return (aVal as number) - (bVal as number)
    })
  })

  return {
    sessionId,
    sessionStatus,
    leads,
    sortedLeads,
    sortBy,
    searched,
    websiteLeadsCount,
    analyzedCount,
    progressPercent,
    setSession,
    setSessionStatus,
    setLeads,
    setContactedAt,
    clear,
    updateAnalysis,
  }
})