<template>
  <div class="max-w-2xl space-y-6">
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

  <!-- Security -->
  <SecuritySettings />
    
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const alertFlow = useAlertFlow()

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

watchEffect(() => {
  if (route.query.error) {
    const key = route.query.error as string | undefined
    if (!key) return null

    const error = errorMap[key] ?? null
    if (!error) return null

    alertFlow.error(error)

    const query = { ...route.query }
    delete query.error

    router.replace({ query })
  }
})
</script>