import { appendResponseHeader } from 'h3';

export default defineNuxtPlugin((nuxtApp) => {
  const apiFetch = $fetch.create({
    baseURL: 'http://localhost:3001',
    credentials: 'include',

    onRequest({ options }) {
      if (import.meta.server) {
        const event = useRequestEvent();
        const cookieHeader = event?.node.req.headers.cookie;
        if (cookieHeader) {
          options.headers = new Headers(options.headers as HeadersInit);
          options.headers.set('cookie', cookieHeader);
        }
      }
    },

    async onResponseError({ response, request, options }) {
      if (response.status === 401) {
        if (import.meta.server) {
          try {
            const event = useRequestEvent();
            const cookieHeader = event?.node.req.headers.cookie;

            const refreshResponse = await $fetch.raw('/auth/refresh', {
              baseURL: 'http://localhost:3001',
              method: 'POST',
              headers: { cookie: cookieHeader ?? '' },
            });

            const setCookies = refreshResponse.headers.getSetCookie();
            if (setCookies.length) {
              setCookies.forEach(cookie => {
                appendResponseHeader(event!, 'set-cookie', cookie);
              });
            }

            const newCookies = refreshResponse.headers.get('set-cookie') ?? cookieHeader ?? '';
            return $fetch(request, {
              ...options,
              headers: { cookie: newCookies },
              method: options.method as any,
            });
          } catch {
            return;
          }
        }

        // Klient
        try {
          await $fetch('/auth/refresh', {
            baseURL: 'http://localhost:3001',
            method: 'POST',
            credentials: 'include',
          });

          return $fetch(request, {
            ...options,
            credentials: 'include',
            method: options.method as any,
          });
        } catch {
          const auth = useAuthStore();
          auth.user = null;
          await navigateTo('/sign-in');
        }
      }
    },
  });

  return {
    provide: {
      api: apiFetch,
    },
  };
});