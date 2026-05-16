<template>
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('settings.connections.title') }}
    </h2>

    <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex justify-between">
        <span>{{ t('settings.connections.gmail') }}</span>
        <span v-if="connection" class="text-neutral-900 dark:text-neutral-100">{{ connection.email }}</span>
        <div v-else class="text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <div class="w-1.5 h-1.5 bg-red-500 dark:bg-red-600 rounded-full"></div>
          {{ $t('settings.connections.not_connected') }}
        </div>
      </div>

      <div class="mt-4">
        <button v-if="!connection" type="button" class="text-neutral-900 dark:text-neutral-100 hover:underline cursor-pointer" @click="showConnectGmailModal = true">{{ $t('settings.connections.connect_gmail') }}</button>
        <button v-else type="button" class="text-neutral-900 dark:text-neutral-100 hover:underline cursor-pointer" @click="showDisconnectGmailModal = true">{{ $t('settings.connections.disconnect_gmail') }}</button>
      </div>
    </div>
  </BaseCard>

  <ConnectGmailModal v-if="showConnectGmailModal" @close="showConnectGmailModal = false" />
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const { t } = useI18n()

const showConnectGmailModal = ref(false)
const showDisconnectGmailModal = ref(false)

type GmailConnection = {
  email: string | null
  status: string | null
}

const userId = computed(() => user.value?.sub)

const { data: connection, status } = await useAsyncData('gmail-connection', async () => {
  if (!userId.value) return null

  const { data, error } = await supabase
    .from('gmail_connections')
    .select('email, status')
    .eq('user_id', userId.value)
    .maybeSingle<GmailConnection>()

  if (error) {
    throw error
  }

  return data
})
</script>