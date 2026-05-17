interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loggedIn = computed(() => !!user.value);

  async function fetchUser() {
    try {
      const headers: Record<string, string> = {};

      if (import.meta.server) {
        const event = useRequestEvent();
        const cookieHeader = event?.node.req.headers.cookie;
        if (cookieHeader) {
          headers.cookie = cookieHeader;
        }
      }

      const { $api } = useNuxtApp();
      user.value = await $api('/auth/profile', { headers });
    } catch {
      user.value = null;
    }
  }

  async function logout() {
    const { $api } = useNuxtApp();
    await $api('/auth/logout', {
      method: 'POST',
    });
    user.value = null;
    await navigateTo('/sign-in');
  }

  return { user, loggedIn, fetchUser, logout };
});