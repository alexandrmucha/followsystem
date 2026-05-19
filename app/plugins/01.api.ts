import { useRequestHeaders } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const csrfStore = useCsrfStore()
  const event = useRequestEvent()

  const baseFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: 'include',

    onRequest({ options }) {
      const headers = new Headers(options.headers)

      // ---------------- SSR cookies ----------------
      if (import.meta.server && event) {
        const cookie = useRequestHeaders(['cookie']).cookie
        if (cookie) {
          headers.set('cookie', cookie)
        }
      }

      // ---------------- CSRF ----------------
      if (csrfStore.token) {
        headers.set('x-csrf-token', csrfStore.token)
      }

      options.headers = headers
    },
  })

  return {
    provide: {
      api: baseFetch,
    },
  }
})