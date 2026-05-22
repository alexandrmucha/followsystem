<template>
  <div class="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50" @click.self="close">
    <div class="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-2xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">

      <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {{ $t('account_deletion.title') }}
      </h1>

      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        {{ $t('account_deletion.warning') }}
      </p>

      <BaseInput
        v-model="confirmText"
        type="text"
        :placeholder="$t('account_deletion.type_delete', { delete: $t('account_deletion.delete') })"
      />

      <div class="flex justify-between gap-3 mt-4">
        <BaseButton type="button" @click="close">
          {{ $t('common.cancel') }}
        </BaseButton>

        <BaseButton
          type="button"
          variant="danger"
          :disabled="!canDelete || loading"
          @click="deleteAccount"
        >
          {{ loading ? $t('common.loading') : $t('account_deletion.delete_account') }}
        </BaseButton>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()
const authStore = useAuthStore()
const csrfStore = useCsrfStore()

const emit = defineEmits<{
  (e: "close"): void
}>()

const loading = ref(false)
const confirmText = ref('')

const canDelete = computed(() => confirmText.value === t('account_deletion.delete'))

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
  emit("close")
}

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.body.style.overflow = "hidden"
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  document.body.style.overflow = ""
  window.removeEventListener('keydown', handleEsc)
})
</script>