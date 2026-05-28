import { defineStore } from 'pinia'

export const useSearchDraftStore = defineStore('searchDraft', () => {
  const industry = ref('')
  const location = ref('')

  function reset() {
    industry.value = ''
    location.value = ''
  }

  function setIndustry(value: string) {
    industry.value = value
  }

  function setLocation(value: string) {
    location.value = value
  }

  return {
    industry,
    location,
    reset,
    setIndustry,
    setLocation
  }
})