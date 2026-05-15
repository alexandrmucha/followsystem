<template>
  <div>
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ t('dashboard.title') }}
    </h1>

    <BaseCard>
      {{ data }}
    </BaseCard>


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

const supabase = useSupabaseClient()

const { data, error } = await useLazyAsyncData("gmail-list-messages", async () => {
  const res = await supabase.functions.invoke("gmail-list-messages");

  return {
    data: res.data ?? null,
    error: res.error ?? null,
  };
});

</script>