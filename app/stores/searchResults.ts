import { defineStore } from 'pinia'
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

export const useSearchResultsStore = defineStore('searchResults', () => {
  const sessionId = ref<string | null>(null)
  const sessionStatus = ref<string | null>(null)
  const leads = ref<BusinessLeadDTO[]>([])
  const searched = ref(false)
  const sortBy = ref<keyof Pick<BusinessLeadDTO, 'mobileScore' | 'performanceScore' | 'seoScore' | 'accessibilityScore' | 'bestPracticesScore'>>('mobileScore')

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

  const sortedLeads = computed(() => {
    const rawLeads = [...leads.value]

    if (sessionStatus.value === 'analyzing') return rawLeads

    return rawLeads.sort((a, b) => {
      if (!a.hasWebsite && b.hasWebsite) return 1
      if (a.hasWebsite && !b.hasWebsite) return -1

      const scoreA = a[sortBy.value] ?? 100
      const scoreB = b[sortBy.value] ?? 100
      return (scoreA as number) - (scoreB as number)
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