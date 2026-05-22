<template>
  <BaseModal
    size="lg"
    :title="$t('account_deletion.title')"
    :description="$t('account_deletion.warning')"
    :closeOnEsc="true"
    :closeOnOverlay="true"
    @close="close"
  >
    <BaseInput
      v-model="confirmText"
      type="text"
      :placeholder="$t('account_deletion.type_delete', { delete: $t('account_deletion.delete') })"
    />

    <div class="flex flex-col sm:flex-row gap-3 mt-4">
      <BaseButton
        type="button"
        class="flex-1"
        @click="close"
      >
        {{ $t('common.cancel') }}
      </BaseButton>

      <BaseButton
        type="button"
        variant="danger"
        class="flex-1"
        :disabled="!canDelete || loading"
        @click="deleteAccount"
      >
        {{ $t('account_deletion.delete_account') }}
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()
const authStore = useAuthStore()
const csrfStore = useCsrfStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const loading = ref(false)
const confirmText = ref('')

const canDelete = computed(() =>
  confirmText.value === t('account_deletion.delete')
)

const deleteAccount = async () => {
  if (loading.value || !canDelete.value) return

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

const close = () => {
  emit('close')
}
</script>