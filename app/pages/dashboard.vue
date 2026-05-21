<template>
  <div>
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ t('dashboard.title') }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const alertFlow = useAlertFlow()

useHead({
  title: t('dashboard.title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

onMounted(() => {
  if (route.query.restored === '1') {
    alertFlow.success(t('account_deletion.restored'))
  }
})
</script>