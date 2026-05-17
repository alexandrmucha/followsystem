export default defineNuxtPlugin(() => {
  const apiFetch = $fetch.create({
    baseURL: 'http://localhost:3001',
    credentials: 'include',

    async onResponseError({ response, request, options }) {
      if (response.status === 401) {
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