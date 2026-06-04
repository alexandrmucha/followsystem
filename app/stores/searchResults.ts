import { defineStore } from 'pinia'
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

export const useSearchResultsStore = defineStore('searchResults', () => {
  const sessionId = ref<string | null>(null)
  const sessionStatus = ref<string | null>(null)
  const leads = ref<BusinessLeadDTO[]>([])
  const searched = ref(false)

  type SortOption = 'leadScore' | keyof Pick<BusinessLeadDTO, 'mobileScore' | 'performanceScore' | 'seoScore' | 'accessibilityScore' | 'bestPracticesScore' | 'largestContentfulPaint' | 'totalByteWeight'>

  const sortBy = useCookie<SortOption>('sortBy', { default: () => 'leadScore' })

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
    hasHttpsRedirect?: boolean | null
    hasViewport?: boolean | null
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
      lead.hasHttpsRedirect = data.hasHttpsRedirect
      lead.hasViewport = data.hasViewport
    }
  }

  const websiteLeadsCount = computed(() => leads.value.filter(l => l.hasWebsite).length)

  const analyzedCount = computed(() =>
    leads.value.filter(l =>
      l.analysisStatus === 'done' ||
      l.analysisStatus === 'error'
    ).length
  )

  const progressPercent = computed(() => {
    if (!websiteLeadsCount.value) return 100
    return Math.round((analyzedCount.value / websiteLeadsCount.value) * 100)
  })

  function computeLeadTiebreaker(lead: BusinessLeadDTO): number {
    if (!lead.hasWebsite || lead.analysisStatus !== 'done') return 100

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

  function computeLeadScore(lead: BusinessLeadDTO): number {
    if (!lead.hasWebsite) return 3
    if (lead.analysisStatus !== 'done') return 0

    let score = 0

    if (lead.hasSsl === false) score += 2
    else if (lead.hasHttpsRedirect === false) score += 1

    if (lead.hasViewport === false) score += 2

    if (lead.largestContentfulPaint != null) {
      if (lead.largestContentfulPaint > 4) score += 2
      else if (lead.largestContentfulPaint > 2.5) score += 1
    }

    if (lead.mobileScore != null) {
      if (lead.mobileScore < 50) score += 2
      else if (lead.mobileScore < 70) score += 1
    }

    if (lead.seoScore != null) {
      if (lead.seoScore < 50) score += 2
      else if (lead.seoScore < 90) score += 1
    }

    return score
  }

  const sortedLeads = computed(() => {
    const rawLeads = [...leads.value]

    if (sessionStatus.value === 'analyzing') return rawLeads

    if (sortBy.value === 'leadScore') {
      return rawLeads.sort((a, b) => {
        const scoreDiff = computeLeadScore(b) - computeLeadScore(a)
        if (scoreDiff !== 0) return scoreDiff
        return computeLeadTiebreaker(a) - computeLeadTiebreaker(b)
      })
    }

    const isMetric = sortBy.value === 'largestContentfulPaint' || sortBy.value === 'totalByteWeight'

    return rawLeads.sort((a, b) => {
      if (!a.hasWebsite && b.hasWebsite) return 1
      if (a.hasWebsite && !b.hasWebsite) return -1

      const aVal = a[sortBy.value]
      const bVal = b[sortBy.value]

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
    clear,
    updateAnalysis,
  }
})