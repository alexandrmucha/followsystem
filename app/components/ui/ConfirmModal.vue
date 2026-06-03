<template>
  <UiBaseModal
    :title="title"
    :description="description"
    size="md"
    :closeOnEsc="true"
    :closeOnOverlay="true"
    @close="$emit('cancel')"
  >
    <div class="flex gap-3 justify-end mt-4">
      <UiBaseButton variant="secondary" size="sm" @click="$emit('cancel')">
        {{ $t('common.cancel') }}
      </UiBaseButton>
      <UiBaseButton variant="danger" size="sm" @click="$emit('confirm')">
        {{ confirmLabel ?? $t('common.confirm') }}
      </UiBaseButton>
    </div>
  </UiBaseModal>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  confirmLabel?: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>