<template>
  <div v-if="alertStore.alert" class="mb-6 max-w-2xl">
    <UiBaseAlert
      :type="alertStore.alert.type"
      :title="alertStore.alert.type === 'error' ? $t('common.error') : undefined"
      :message="alertStore.alert.message"
      :dismissible="alertStore.alert.dismissible"
      @dismiss="alertStore.clear()"
    >
      <template v-if="alertStore.alert.type === 'success'" #icon>
        <LucideCircleCheckBig :size="24" />
      </template>

      <template v-else-if="alertStore.alert.type === 'error'" #icon>
        <LucideCircleX :size="24" />
      </template>
    </UiBaseAlert>
  </div>
</template>

<script lang="ts" setup>
const alertStore = useAlertStore()
</script>