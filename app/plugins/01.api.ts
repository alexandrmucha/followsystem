import { appendResponseHeader } from 'h3'
import { parse } from 'cookie-es'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const csrfStore = useCsrfStore()
  const event = useRequestEvent()

  // =========================================================
  // CLIENT REFRESH LOCK
  // =========================================================

  let clientRefreshPromise: Promise<void> | null = null

  // =========================================================
  // SSR SHARED STATE
  // =========================================================

  if (import.meta.server && event) {
    event.context.authCookies ||= useRequestHeaders(['cookie']).cookie || ''
    event.context.refreshPromise ||= null
  }

  // =========================================================
  // HELPERS
  // =========================================================

  function getCookieHeader(): string {
    if (import.meta.server && event?.context.authCookies) {
      return event.context.authCookies
    }
    return ''
  }

  function serializeCookieHeader(cookies: Record<string, string>) {
    return Object.entries(cookies)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ')
  }

  // =========================================================
  // BASE FETCH
  // =========================================================

  const baseFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: 'include',

    onRequest({ options }) {
      const headers = new Headers(options.headers)

      if (import.meta.server) {
        const cookieHeader = getCookieHeader()

        if (cookieHeader) {
          headers.delete('cookie')
          headers.set('cookie', cookieHeader)
        }
      }

      if (csrfStore.token) {
        headers.set('x-csrf-token', csrfStore.token)
      }

      options.headers = headers
    }
  })

  // =========================================================
  // MAIN API FETCH
  // =========================================================

  const apiCustomFetch = async <T>(
    url: string,
    options: any = {}
  ): Promise<T> => {
    try {
      return await baseFetch<T>(url, options)
    } catch (error: any) {
      // Ignore non-401 errors
      if (error?.statusCode !== 401) {
        throw error
      }

      if (url.includes('/csrf/csrf-token')) {
        throw error
      }

      // Prevent infinite refresh loop
      if (url.includes('/auth/refresh')) {
        throw error
      }

      // =====================================================
      // CLIENT REFRESH FLOW
      // =====================================================

      if (import.meta.client) {
        return await handleClientRefresh<T>(url, options)
      }

      // =====================================================
      // SSR REFRESH FLOW
      // =====================================================

      return await handleSSRRefresh<T>(url, options)
    }
  }

  // =========================================================
  // CLIENT REFRESH
  // =========================================================

  async function handleClientRefresh<T>(
    url: string,
    options: any
  ): Promise<T> {
    try {
      if (!clientRefreshPromise) {
        clientRefreshPromise = $fetch<void>(
          `${config.public.apiBaseUrl}/auth/refresh`,
          {
            method: 'POST',
            credentials: 'include',
            headers: csrfStore.token ? { 'x-csrf-token': csrfStore.token } : {}
          }
        )
          .catch(async (refreshError) => {
            authStore.user = null
            await navigateTo('/sign-in')
            throw refreshError
          })
          .finally(() => {
            clientRefreshPromise = null
          })
      }

      await clientRefreshPromise

      return await baseFetch<T>(url, options)
    } catch (error) {
      throw error
    }
  }

  // =========================================================
  // SSR REFRESH
  // =========================================================

  async function handleSSRRefresh<T>(
    url: string,
    options: any
  ): Promise<T> {
    try {
      if (!event) {
        throw new Error('SSR event is missing')
      }

      // =====================================================
      // SINGLE SSR REFRESH LOCK
      // =====================================================

      if (!event.context.refreshPromise) {
        event.context.refreshPromise = (async () => {

          const refreshHeaders: Record<string, string> = {}
          if (event.context.authCookies) {
            refreshHeaders['cookie'] = event.context.authCookies
          }

          if (csrfStore.token) {
            refreshHeaders['x-csrf-token'] = csrfStore.token
          }

          const refreshResponse = await $fetch.raw(
            `${config.public.apiBaseUrl}/auth/refresh`,
            {
              method: 'POST',
              credentials: 'include',
              headers: refreshHeaders
            }
          )

          // =================================================
          // EXTRACT SET-COOKIE HEADERS
          // =================================================

          const setCookies = refreshResponse.headers.getSetCookie()

          // =================================================
          // FORWARD COOKIES TO CLIENT
          // =================================================

          setCookies.forEach((cookie) => {
            appendResponseHeader(event, 'set-cookie', cookie)
          })

          // =================================================
          // BUILD COOKIE STRING
          // =================================================

          const newCookieString = setCookies
            .map((cookie) => cookie.split(';')[0]?.trim())
            .filter(Boolean)
            .join('; ')

          // =================================================
          // MERGE WITH EXISTING COOKIES
          // =================================================

          const existingCookies = parse(event.context.authCookies || '')
          const incomingCookies = parse(newCookieString)

          const mergedCookies = {
            ...existingCookies,
            ...incomingCookies
          }

          event.context.authCookies = serializeCookieHeader(mergedCookies)
        })().finally(() => {
          event.context.refreshPromise = null
        })
      }

      // =====================================================
      // WAIT FOR SHARED REFRESH
      // =====================================================

      await event.context.refreshPromise

      // =====================================================
      // RETRY ORIGINAL REQUEST
      // =====================================================

      return await baseFetch<T>(url, options)
    } catch (error) {
      authStore.user = null

      return await navigateTo('/sign-in') as never
    }
  }

  // =========================================================
  // PROVIDE
  // =========================================================

  return {
    provide: {
      api: apiCustomFetch
    }
  }
})
