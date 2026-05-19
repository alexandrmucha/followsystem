<template>
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('settings.security.title') }}
    </h2>

    <div class="text-sm text-neutral-700 dark:text-neutral-300">
      
      <div class="flex justify-between items-center">
        <span>{{ t('settings.security.active_devices') }}</span>

        <span class="text-neutral-900 dark:text-neutral-100">{{ sessionsCount }}</span>
      </div>

      <div class="mt-6">
        <button type="button" @click="logoutAll" class="text-red-500" :class="isDisabled ? 'opacity-50' : 'hover:underline cursor-pointer'" :disabled="isDisabled" >{{ $t('settings.security.logout_all') }}</button>
      </div>

    </div>
  </BaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()

const emit = defineEmits<{
  (e: 'success', message: string): void
  (e: 'error', message: string): void
}>()

const loading = ref(false)

const isDisabled = computed(() =>
  loading.value || (sessionsCount.value ?? 0) <= 1
)

const { data: sessionsCount, refresh } = await useAsyncData('sessions-count', () =>
  $api<number>('/auth/sessions/count')
)

const logoutAll = async () => {
  if (isDisabled.value) return

  loading.value = true

  try {
    await $api('/auth/logout-all', { method: 'POST' })
    await refresh()

    alertFlow.success(t('settings.success.logout_all'))
  } catch (err) {
    console.error(err)

    alertFlow.error(t('settings.errors.logout_all'))
  } finally {
    loading.value = false
  }
}
</script>