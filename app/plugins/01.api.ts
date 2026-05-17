import { appendResponseHeader } from 'h3'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  let isRefreshingPromise: Promise<any> | null = null

  const baseFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: 'include',
    onRequest({ options }) {
      if (import.meta.server) {
        options.headers = { ...options.headers, ...useRequestHeaders(['cookie']) }
      }
    },
  })

  const apiCustomFetch = async <T>(url: string, options: any = {}): Promise<T> => {
    try {
      return await baseFetch<T>(url, options)
    } catch (error: any) {
      if (error.statusCode !== 401 || url.includes('/auth/refresh')) {
        throw error
      }

      if (import.meta.client) {
        if (!isRefreshingPromise) {
          isRefreshingPromise = $fetch(`${config.public.apiBaseUrl}/auth/refresh`, {
            method: 'POST',
            credentials: 'include'
          })
          .catch(async (refreshError) => {
            authStore.user = null
            await navigateTo('/sign-in')
            throw refreshError
          })
          .finally(() => {
            isRefreshingPromise = null
          })
        }

        try {
          await isRefreshingPromise
          return await baseFetch<T>(url, options)
        } catch (failedRefresh) {
          throw failedRefresh
        }
      }

      return await handleSSRRefresh<T>(url, options)
    }
  }

  async function handleSSRRefresh<T>(url: string, options: any): Promise<T> {
    const initialHeaders = useRequestHeaders(['cookie'])

    try {
      const refreshResponse = await $fetch.raw(`${config.public.apiBaseUrl}/auth/refresh`, {
        method: 'POST',
        headers: initialHeaders,
        credentials: 'include'
      })

      const cookies = refreshResponse.headers.getSetCookie()

      if (import.meta.server) {
        const event = useRequestEvent()
        
        if (event && cookies.length > 0) {
          cookies.forEach(cookie => {
            appendResponseHeader(event, 'set-cookie', cookie)
          })
        }
        
        const currentHeaders = options.headers instanceof Headers 
          ? Object.fromEntries(options.headers.entries()) 
          : (options.headers || {})

        options.headers = {
          ...currentHeaders,
          cookie: cookies.map(c => c.split(';')[0]).join('; ')
        }
      }

      return await baseFetch<T>(url, options)
    } catch (refreshError) {
      authStore.user = null
      throw navigateTo('/sign-in')
    }
  }

  return {
    provide: {
      api: apiCustomFetch,
    },
  }
})
