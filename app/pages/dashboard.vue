<template>
  <div>
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ t('dashboard.title') }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('dashboard.title')
})

definePageMeta({
  layout: 'dashboard',
})
</script>