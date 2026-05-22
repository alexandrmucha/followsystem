<template>
  <BaseCard>
    <h2 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
      {{ $t('settings.danger.title') }}
    </h2>

    <div class="text-sm text-neutral-700 dark:text-neutral-300">

      <div class="mt-6">
        <button type="button" @click="showDeleteAccountModal = true" class="text-red-500 hover:underline cursor-pointer">{{ $t('account_deletion.delete_account') }}</button>
      </div>

    </div>

  </BaseCard>

  <DeleteAccountModal v-if="showDeleteAccountModal" @close="showDeleteAccountModal = false" />
</template>

<script lang="ts" setup>
const showDeleteAccountModal = ref(false)
</script>