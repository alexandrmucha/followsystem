<template>
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('settings.connections.title') }}
    </h2>

    <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      <div class="flex justify-between">
        <span>{{ t('settings.connections.gmail') }}</span>
        <span v-if="connection" class="text-neutral-900 dark:text-neutral-100">{{ connection.email }}</span>
        <span v-else class="text-neutral-900 dark:text-neutral-100">{{ $t('settings.connections.not_connected') }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const { t } = useI18n()

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