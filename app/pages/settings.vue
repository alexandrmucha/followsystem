<template>
  <div class="max-w-md space-y-6">
    <!-- Title -->
    <h1 class="text-xl font-semibold">
      {{ t('settings.title') }}
    </h1>

    <!-- Account info -->
    <UiBaseCard>
      <h2 class="text-sm font-medium mb-4">
        {{ t('settings.account.title') }}
      </h2>

      <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
        <div class="flex justify-between">
          <span>{{ t('settings.account.email') }}</span>
          <span class="text-neutral-900 dark:text-neutral-100">{{ authStore.user?.email }}</span>
        </div>
      </div>
    </UiBaseCard>

  <!-- Preferences -->
  <UiBaseCard>
    <h2 class="text-sm font-medium mb-4">
      {{ t('settings.preferences.title') }}
    </h2>

    <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex justify-between items-center">
        <span>{{ t('settings.preferences.theme.title') }}</span>

        <UiBaseSelect v-model="$colorMode.preference" size="sm">
          <option value="system">{{ t('settings.preferences.theme.system') }}</option>
          <option value="light">{{ t('settings.preferences.theme.light') }}</option>
          <option value="dark">{{ t('settings.preferences.theme.dark') }}</option>
        </UiBaseSelect>
      </div>

      <div class="flex justify-between items-center">
        <span>{{ t('settings.preferences.language') }}</span>

        <UiBaseSelect
          :model-value="locale"
          @update:model-value="handleLocaleChange"
          size="sm"
        >
          <option v-for="loc in locales" :key="loc.code" :value="loc.code">{{ loc.name }}</option>
        </UiBaseSelect>
      </div>
    </div>
  </UiBaseCard>

  <!-- Security -->
  <SettingsSecurity />

  <!-- Danger -->
  <SettingsDanger />
    
  </div>
</template>

<script lang="ts" setup>
const { t, locale, locales, setLocale } = useI18n()
const route = useRoute()
const authStore = useAuthStore()
const alertFlow = useAlertFlow()

useHead({
  title: t('settings.title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const handleLocaleChange = async (value: string | number | undefined) => {
  if (typeof value !== 'string') return
  if (value === locale.value) return

  await setLocale(value as 'en' | 'cs')
}

const errorMap: Record<string, string> = {
  gmail_already_connected: t('settings.errors.gmail_already_connected'),
  different_google_account: t('settings.errors.different_google_account'),
  gmail_general: t('settings.errors.gmail_general'),
}

onMounted(() => {
  if (route.query.error) {
    const key = route.query.error as string | undefined
    if (!key) return null

    const error = errorMap[key] ?? null
    if (!error) return null

    alertFlow.error(error)
  }
})
</script>