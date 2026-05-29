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

  function updateAnalysisStatus(leadId: string, status: NonNullable<BusinessLeadDTO['analysisStatus']>) {
    const lead = leads.value.find(l => l.id === leadId)
    if (lead) {
      lead.analysisStatus = status
    }
  }

  return {
    sessionId,
    leads,
    searched,
    setSession,
    setLeads,
    clear,
    updateAnalysisStatus,
  }
})