import { useRequestHeaders } from '#app'
import type { FetchError } from 'ofetch'

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

  // =========================
  // CSRF REFRESH LOCK (dedupe)
  // =========================
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
      const message = err?.response?._data?.message
      const isCsrfError = message === 'invalid csrf token'

      if (isCsrfError && !_retry) {
        console.log("refreshing")
        await refreshCsrfOnce()
        return api<T>(url, options, true)
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