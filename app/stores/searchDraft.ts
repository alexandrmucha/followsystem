import { defineStore } from 'pinia'

export const useSearchDraftStore = defineStore('searchDraft', () => {
  const industry = ref('')
  const location = ref('')

  return {
    industry,
    location,
  }
})