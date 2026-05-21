<template>
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('settings.danger.title') }}
    </h2>

    <div class="text-sm text-neutral-700 dark:text-neutral-300">

      <div class="mt-6">
        <button type="button" @click="deleteAccount" class="text-red-500" :class="isDisabled ? 'opacity-50' : 'hover:underline cursor-pointer'" :disabled="isDisabled" >{{ $t('settings.danger.delete_account') }}</button>
      </div>

    </div>

  </BaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()
const authStore = useAuthStore()
const csrfStore = useCsrfStore()

const loading = ref(false)

const isDisabled = computed(() =>
  loading.value
)

const deleteAccount = async () => {
  if (isDisabled.value) return

  alertFlow.clear()
  loading.value = true

  try {
    await $api('/auth/delete-account', { method: 'POST' })

    authStore.user = null
    await csrfStore.fetchToken()
    await navigateTo('/sign-in')

    alertFlow.success(t('account_deletion.success'))
  } catch (err) {
    alertFlow.error(t('settings.errors.delete_account'))
  } finally {
    loading.value = false
  }
}
</script>