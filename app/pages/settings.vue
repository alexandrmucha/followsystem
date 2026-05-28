<template>
  <div class="max-w-md space-y-6">
    <!-- Title -->
    <h1 :class="pageTitleClass">
      {{ $t('settings.title') }}
    </h1>

    <!-- Account info -->
    <SettingsSection :title="$t('settings.account.title')">
      <SettingsRow>
        <template #label>
          {{ $t('settings.account.email') }}
        </template>

        <template #value>
          {{ authStore.user?.email }}
        </template>
      </SettingsRow>
    </SettingsSection>

    <!-- Preferences -->
    <SettingsSection :title="$t('settings.preferences.title')">
      <SettingsRow>
        <template #label>
          {{ $t('settings.preferences.theme.title') }}
        </template>

        <template #value>
          <UiBaseSelect v-model="$colorMode.preference" size="sm">
            <option value="system">{{ $t('settings.preferences.theme.system') }}</option>
            <option value="light">{{ $t('settings.preferences.theme.light') }}</option>
            <option value="dark">{{ $t('settings.preferences.theme.dark') }}</option>
          </UiBaseSelect>
        </template>
      </SettingsRow>

      <SettingsRow>
        <template #label>
          {{ $t('settings.preferences.language') }}
        </template>

        <template #value>
          <UiBaseSelect :model-value="locale" @update:model-value="handleLocaleChange" size="sm">
            <option v-for="loc in locales" :key="loc.code" :value="loc.code">
              {{ loc.name }}
            </option>
          </UiBaseSelect>
        </template>
      </SettingsRow>

    </SettingsSection>

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