import { defineStore } from 'pinia'

export const useCsrfStore = defineStore('csrf', () => {
  const token = ref<string | null>(null)

  async function fetchToken() {
    try {
      const { $api } = useNuxtApp()
      const response = await $api<{ csrfToken: string }>('/csrf/csrf-token')
      token.value = response.csrfToken
    } catch (error) {
      console.error('Nepodařilo se načíst CSRF token:', error)
      token.value = null
    }
  }

  return { token, fetchToken }
})
