<template>
  <SettingsSection :title="$t('settings.security.title')">
    <SettingsRow>
      <template #label>
        {{ t('settings.security.active_sessions') }}
      </template>

      <template #value>
        <span class="text-neutral-900 dark:text-neutral-100">
          {{ data?.count }}
        </span>
      </template>
    </SettingsRow>

    <div class="mt-6">
      <button type="button" :disabled="isDisabled" :class="isDisabled ? disabledDangerLinkClass : dangerLinkClass" @click="logoutAll">
        {{ $t('settings.security.logout_all') }}
      </button>
    </div>
  </SettingsSection>
</template>

<script lang="ts" setup>
import { dangerLinkClass, disabledDangerLinkClass } from '~/utils/ui'

const { t } = useI18n()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()

const loading = ref(false)

const { data, refresh } = await useAsyncData('sessions-count', () =>
  $api<{ count: number }>('/auth/sessions/count')
)

const isDisabled = computed(() =>
  loading.value || (data.value?.count ?? 0) <= 1
)

const logoutAll = async () => {
  if (isDisabled.value) return

  alertFlow.clear()
  loading.value = true

  try {
    await $api('/auth/logout-all', { method: 'POST' })
    await refresh()

    alertFlow.success(t('settings.success.logout_all'))
  } catch (err) {
    alertFlow.error(t('settings.errors.logout_all'))
  } finally {
    loading.value = false
  }
}
</script>