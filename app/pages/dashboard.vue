<template>
  <div>
    <ConnectGmailModal :open="true" />
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

<style>

</style>