<template>
  <div class="flex items-center justify-between gap-4">
    <div class="min-w-0">
      <span class="text-sm text-neutral-700 dark:text-neutral-300">
        <slot name="label" />
      </span>
    </div>

    <div class="flex items-center justify-end">
      <span class="text-sm text-neutral-900 dark:text-neutral-100">
        <slot name="value" />
      </span>
    </div>
    
  </div>
</template>

<script setup lang="ts">
</script>