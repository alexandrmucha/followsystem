<template>
  <div>
    <button type="button" @click="showConnectGmailModal = true">Show connect Gmail modal</button>
    <ConnectGmailModal v-if="showConnectGmailModal" @close="showConnectGmailModal = false" />
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

const showConnectGmailModal = ref(false)
</script>

<style>

</style>