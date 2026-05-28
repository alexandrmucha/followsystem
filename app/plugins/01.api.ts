import { useRequestHeaders } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const csrfStore = useCsrfStore()
  const authStore = useAuthStore()
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

  let csrfRefreshPromise: Promise<any> | null = null

  async function refreshCsrfOnce() {
    if (!csrfRefreshPromise) {
      csrfRefreshPromise = csrfStore.fetchToken().finally(() => {
        csrfRefreshPromise = null
      })
    }

    return csrfRefreshPromise
  }

  async function api<T>(url: string, options: any = {}, _retry = false): Promise<T> {
    try {
      return await baseFetch(url, options)
    } catch (err: any) {
      const status = err?.response?.status
      const message = err?.response?._data?.message

      const isCsrfError = message === 'invalid csrf token'
      const is401 = status === 401

      // ---------------- CSRF RETRY ----------------
      if (isCsrfError && !_retry) {
        await refreshCsrfOnce()
        return api<T>(url, options, true)
      }

      // ---------------- AUTO LOGOUT ----------------
      if (is401) {
        authStore.user = null
        await csrfStore.fetchToken()
        await navigateTo('/sign-in')
      }

      throw err
    }
  }

  return {
    provide: {
      api,
    },
  }
})