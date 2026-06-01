import { defineStore } from 'pinia'
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

export const useSearchResultsStore = defineStore('searchResults', () => {
  const sessionId = ref<string | null>(null)
  const leads = ref<BusinessLeadDTO[]>([])
  const searched = ref(false)

  function setSession(id: string) {
    sessionId.value = id
  }

  function setLeads(data: BusinessLeadDTO[]) {
    leads.value = data
    searched.value = true
  }

  function clear() {
    sessionId.value = null
    leads.value = []
    searched.value = false
  }

  function updateAnalysis(leadId: string, data: {
    status: NonNullable<BusinessLeadDTO['analysisStatus']>
    performanceScore?: number | null
    mobileScore?: number | null
  }) {
    const lead = leads.value.find(l => l.id === leadId)
    if (lead) {
      lead.analysisStatus = data.status
      lead.performanceScore = data.performanceScore
      lead.mobileScore = data.mobileScore
    }
  }

  const analyzing = computed(() =>
    leads.value.some(l => l.hasWebsite && l.analysisStatus !== 'done' && l.analysisStatus !== 'error')
  )

  return {
    sessionId,
    leads,
    searched,
    analyzing,
    setSession,
    setLeads,
    clear,
    updateAnalysis,
  }
})