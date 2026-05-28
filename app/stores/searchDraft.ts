import { defineStore } from 'pinia'

export const useSearchDraftStore = defineStore('searchDraft', () => {
  const industry = ref('')
  const location = ref('')
  const focus = ref('weak_websites')
  const limit = ref(25)

  const isValid = computed(() => {
    return industry.value.trim() !== '' && location.value.trim() !== ''
  })

  function reset() {
    industry.value = ''
    location.value = ''
    focus.value = 'weak_websites'
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
    focus,
    limit,
    isValid,
    reset,
    setIndustry,
    setLocation
  }
})