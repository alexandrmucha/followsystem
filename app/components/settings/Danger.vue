<template>
  <SettingsSection :title="$t('settings.danger.title')">
    <div class="mt-6">
      <button type="button" @click="showDeleteAccountModal = true" :class="dangerLinkClass">{{ $t('account_deletion.delete_account') }}</button>
    </div>
  </SettingsSection>

  <SettingsDeleteAccountModal v-if="showDeleteAccountModal" @close="showDeleteAccountModal = false" />
</template>

<script lang="ts" setup>
import { dangerLinkClass } from '~/utils/ui';

const showDeleteAccountModal = ref(false)
</script>