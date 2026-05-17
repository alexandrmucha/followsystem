<template>
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('settings.security.title') }}
    </h2>

    <div class="text-sm text-neutral-700 dark:text-neutral-300">
      
      <div class="flex justify-between items-center">
        <span>{{ t('settings.security.active_devices') }}</span>

        <span class="text-neutral-900 dark:text-neutral-100">{{ sessionsCount }}</span>
      </div>

    </div>
  </BaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()

const { data: sessionsCount } = await useAsyncData('sessions-count', () =>
  $api<number>('/auth/sessions/count')
)
</script>