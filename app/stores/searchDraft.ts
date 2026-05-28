import { defineStore } from 'pinia'

export const useSearchDraftStore = defineStore('searchDraft', () => {
  const industry = ref('')
  const location = ref('')
  const limit = ref(25)

  const isValid = computed(() => {
    return industry.value.trim() !== '' && location.value.trim() !== ''
  })

  function reset() {
    industry.value = ''
    location.value = ''
    limit.value = 25
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
    limit,
    isValid,
    reset,
    setIndustry,
    setLocation
  }
})