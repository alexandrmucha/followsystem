import { defineStore } from 'pinia'

export const useSearchResultsStore = defineStore('searchResults', () => {
  const sessionId = ref<string | null>(null)
  const leads = ref<any[]>([])

  function setSession(id: string) {
    sessionId.value = id
  }

  function setLeads(data: any[]) {
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