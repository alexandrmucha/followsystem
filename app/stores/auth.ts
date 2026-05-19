import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loggedIn = computed(() => !!user.value);
  const csrfStore = useCsrfStore();

  async function fetchUser() {
    try {
      const { $api } = useNuxtApp();
      user.value = await $api('/auth/profile');
    } catch {
      user.value = null;
    }
  }

  async function logout() {
    const { $api } = useNuxtApp()
    const alerts = useAlertStore()
    const { $i18n } = useNuxtApp()

    try {
      await $api('/auth/logout', {
        method: 'POST'
      })

      user.value = null

      await csrfStore.fetchToken()

      await navigateTo('/sign-in')
    } catch (err) {
      alerts.error($i18n.t('auth.errors.logout'))
    }
  }

  return { user, loggedIn, fetchUser, logout };
});
