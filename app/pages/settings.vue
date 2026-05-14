<template>
  <div class="max-w-2xl space-y-6">
    <!-- Title -->
    <div>
      <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        {{ t('settings.title') }}
      </h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        {{ t('settings.description') }}
      </p>
    </div>

    <!-- Password changed alert -->
    <BaseAlert
      v-if="showPasswordChanged"
      type="success"
      :title="$t('auth.update_password.success.title')"
      :message="$t('auth.update_password.success.message')"
    >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key-round-icon lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
      </template>
    </BaseAlert>

    <!-- Account info -->
    <BaseCard>
      <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
        {{ t('settings.account.title') }}
      </h2>

      <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
        <div class="flex justify-between">
          <span>{{ t('settings.account.email') }}</span>
          <span class="text-neutral-900 dark:text-neutral-100">{{ user?.email }}</span>
        </div>
      </div>
    </BaseCard>

  <!-- Preferences -->
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('settings.preferences.title') }}
    </h2>

    <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex justify-between items-center">
        <span>{{ t('settings.preferences.theme.title') }}</span>

        <select v-model="$colorMode.preference" class="text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700">
          <option value="system">{{ t('settings.preferences.theme.system') }}</option>
          <option value="light">{{ t('settings.preferences.theme.light') }}</option>
          <option value="dark">{{ t('settings.preferences.theme.dark') }}</option>
        </select>
      </div>

      <div class="flex justify-between items-center">
        <span>{{ t('settings.preferences.language') }}</span>

        <select @change="handleLocaleSwitch" class="text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700">
          <option v-for="loc in locales" :key="loc.code" :value="loc.code" :selected="loc.code === currentLocale">{{ loc.name }}</option>
        </select>
      </div>
    </div>
  </BaseCard>

  <!-- Security -->
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('settings.security.title') }}
    </h2>

    <NuxtLink to="/update-password" class="inline-flex items-center text-sm text-neutral-900 dark:text-neutral-100 font-medium hover:underline cursor-pointer">
      {{ t('settings.security.change_password') }}
    </NuxtLink>
  </BaseCard>
    
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('settings.title')
})

definePageMeta({
  layout: 'dashboard',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { locale: currentLocale, setLocale, locales, } = useI18n()

const handleLocaleSwitch = (event: Event) => {
  const selectedLocale = (event.target as HTMLSelectElement).value;
  // @ts-ignore
  setLocale(selectedLocale);
};

const route = useRoute()

const showPasswordChanged = ref(false)

onMounted(() => {
  if (route.query.password_changed === 'true') {
    showPasswordChanged.value = true

    navigateTo('/settings', { replace: true })
  }
})
</script>

<style>
</style>