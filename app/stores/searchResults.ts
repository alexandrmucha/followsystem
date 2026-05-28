import { defineStore } from 'pinia'
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

export const useSearchResultsStore = defineStore('searchResults', () => {
  const sessionId = ref<string | null>(null)
  const leads = ref<BusinessLeadDTO[]>([])

  function setSession(id: string) {
    sessionId.value = id
  }

  function setLeads(data: BusinessLeadDTO[]) {
    leads.value = data
  }

  function clear() {
    sessionId.value = null
    leads.value = []
  }

  return {
    sessionId,
    leads,
    setSession,
    setLeads,
    clear,
  }
})