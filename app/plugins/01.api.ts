export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: 'http://localhost:3001',
    credentials: 'include',
  })

  let isRefreshing = false

  const apiWithAuth = async (url: any, options: any = {}) => {
    try {
      return await api(url, options)
    } catch (err: any) {
      if (err?.status !== 401) {
        throw err
      }

      // ❗ zabrání loopu
      if (url === '/auth/refresh') {
        throw err
      }

      // ❗ pokud už refresh běží, nevolat znovu
      if (isRefreshing) {
        throw err
      }

      try {
        isRefreshing = true

        await api('/auth/refresh', {
          method: 'POST',
        })

        return await api(url, options)
      } finally {
        isRefreshing = false
      }
    }
  }

  return {
    provide: {
      api: apiWithAuth,
    },
  }
})