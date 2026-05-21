<template>
  <div class="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div class="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">

      <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {{ $t('account_deletion.title') }}
      </h1>



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

const deleteAccount = async () => {
  if (loading.value) return

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

onMounted(() => {
  document.body.style.overflow = "hidden"
})

onUnmounted(() => {
  document.body.style.overflow = ""
})
</script>