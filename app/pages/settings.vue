<template>
  <div class="max-w-2xl space-y-6">
    <BaseAlert
      v-if="error"
      type="error"
      :title="$t('settings.errors.title')"
      :message="error"
    >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      </template>
    </BaseAlert>

    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
      {{ t('settings.title') }}
    </h1>

    <!-- Account info -->
    <BaseCard>
      <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
        {{ t('settings.account.title') }}
      </h2>

      <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
        <div class="flex justify-between">
          <span>{{ t('settings.account.email') }}</span>
          <span class="text-neutral-900 dark:text-neutral-100">{{ authStore.user?.email }}</span>
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

  <!-- Connections -->
  <!-- <ConnectionsSettings /> -->
    
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

useHead({
  title: t('settings.title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { locale: currentLocale, setLocale, locales } = useI18n()

const handleLocaleSwitch = (event: Event) => {
  const selectedLocale = (event.target as HTMLSelectElement).value
  // @ts-ignore
  setLocale(selectedLocale)
}

const errorMap: Record<string, string> = {
  gmail_already_connected: t('settings.errors.gmail_already_connected'),
  different_google_account: t('settings.errors.different_google_account'),
  gmail_general: t('settings.errors.gmail_general'),
}

const error = computed(() => {
  const key = route.query.error as string | undefined
  if (!key) return null
  return errorMap[key]
})
</script>