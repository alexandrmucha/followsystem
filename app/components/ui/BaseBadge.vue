<template>
  <span class="rounded-full px-2.5 py-0.5 text-xs font-medium select-none" :class="variantClass">
    <slot />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  variant: 'neutral' | 'emerald' | 'blue' | 'amber' | 'red'
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'emerald': return 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300'
    case 'blue':    return 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300'
    case 'amber':   return 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300'
    case 'red':     return 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300'
    default:        return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
  }
})
</script>
