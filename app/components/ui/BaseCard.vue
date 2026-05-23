<template>
  <div
    :class="[
      'bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl border p-4 sm:p-6',
      active
        ? 'border-indigo-500/40 dark:border-indigo-400/30'
        : 'border-neutral-200 dark:border-neutral-800'
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
</script>