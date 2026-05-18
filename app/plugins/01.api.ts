import { appendResponseHeader } from 'h3'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const event = useRequestEvent()

  function parseCookieHeader(cookieHeader: string = ''): Record<string, string> {
    return cookieHeader
      .split(';')
      .map(v => v.trim())
      .filter(Boolean)
      .reduce((acc, cookie) => {
        const [key, ...rest] = cookie.split('=')
        if (!key) return acc
        acc[key] = rest.join('=')
        return acc
      }, {} as Record<string, string>)
  }

  function serializeCookieHeader(cookies: Record<string, string>): string {
    return Object.entries(cookies)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ')
  }

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
    // SSR → shared mutable cookies
    if (import.meta.server && event?.context.authCookies) {
      return event.context.authCookies
    }

    // CLIENT → browser handles cookies automatically
    return ''
  }

  // =========================================================
  // BASE FETCH
  // =========================================================

  const baseFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: 'include',

    onRequest({ options }) {
      if (import.meta.server) {
        const cookieHeader = getCookieHeader()

        if (cookieHeader) {
          // Vytvoříme standardní instanci Headers z jakéhokoliv formátu, který v options.headers je
          const headers = new Headers(options.headers)

          // Nativně smažeme staré varianty hlavičky (Headers ignorují velikost písmen)
          headers.delete('cookie')

          // Nativně nastavíme novou hodnotu cookies
          headers.set('cookie', cookieHeader)

          // Přiřadíme objekt zpět. TypeScript je spokojený, protože typ přesně odpovídá
          options.headers = headers
        }
      }
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
      // Ignore non-401
      if (error?.statusCode !== 401) {
        throw error
      }

      // Prevent infinite refresh loop
      if (url.includes('/auth/refresh')) {
        throw error
      }

      // =====================================================
      // CLIENT REFRESH
      // =====================================================

      if (import.meta.client) {
        return await handleClientRefresh<T>(url, options)
      }

      // =====================================================
      // SSR REFRESH
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
            credentials: 'include'
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
        throw new Error('SSR event missing')
      }

      // =====================================================
      // SINGLE SSR REFRESH LOCK
      // =====================================================

      if (!event.context.refreshPromise) {
        event.context.refreshPromise = (async () => {
          const refreshResponse = await $fetch.raw(
            `${config.public.apiBaseUrl}/auth/refresh`,
            {
              method: 'POST',
              credentials: 'include',
              headers: event.context.authCookies 
                ? { cookie: event.context.authCookies } 
                : {}
            }
          )

          // =================================================
          // GET NEW COOKIES
          // =================================================

          const setCookies = refreshResponse.headers.getSetCookie()

          // =================================================
          // FORWARD COOKIES TO BROWSER
          // =================================================

          setCookies.forEach((cookie) => {
            appendResponseHeader(event, 'set-cookie', cookie)
          })

          // =================================================
          // BUILD NEW COOKIE HEADER
          // =================================================

          const newCookies = setCookies
            .map((cookie) => cookie.split(';')[0]?.trim())
            .filter(Boolean)
            .join('; ')

          // =================================================
          // MERGE WITH EXISTING COOKIES
          // =================================================

          const existingCookies = parseCookieHeader(event.context.authCookies || '')
          const incomingCookies = parseCookieHeader(newCookies)

          const mergedCookies = {
            ...existingCookies,
            ...incomingCookies // <- nové přepíšou staré
          }

          event.context.authCookies = serializeCookieHeader(mergedCookies)
        })()
          .finally(() => {
            event.context.refreshPromise = null
          })
      }

      // =====================================================
      // WAIT FOR SHARED REFRESH
      // =====================================================

      await event.context.refreshPromise

      // =====================================================
      // RETRY ORIGINAL REQUEST (Pomocí čistého $fetch)
      // =====================================================

      // 1. Vytvoříme standardní instanci Headers z původních options.headers
      const finalHeaders = new Headers(options.headers)

      // 2. Třída Headers automaticky vymaže staré cookies bez ohledu na velikost písmen
      finalHeaders.delete('cookie')

      // 3. Nastavíme nejaktuálnější cookies z event.context
      if (event.context.authCookies) {
        finalHeaders.set('cookie', event.context.authCookies)
      }

      // 4. Použijeme globální $fetch, abychom neprocházeli interceptorem podruhé
      return await $fetch<T>(url, {
        baseURL: config.public.apiBaseUrl,
        credentials: 'include',
        ...options,
        headers: finalHeaders
      })
    } catch (error) {
      console.error('SSR refresh failed:', error)
      authStore.user = null

      // Na serveru je u navigateTo vyžadován await
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
