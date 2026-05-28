<template>
  <UiBaseCard>
    <h2 class="text-sm font-medium mb-4">
      {{ title }}
    </h2>

    <div class="space-y-3">
      <slot />
    </div>
  </UiBaseCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>