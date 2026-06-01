<template>
  <div class="flex items-center gap-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1.5">
    <span class="text-xs text-neutral-500 dark:text-neutral-400">
      {{ label }}
    </span>
    <span class="text-xs font-semibold" :class="scoreColor">
      {{ score ?? '--' }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string
  score: number | null | undefined
}>()

const scoreColor = computed(() => {
  if (props.score === null || props.score === undefined) return 'text-neutral-400 dark:text-neutral-500'
  if (props.score < 50) return 'text-red-600 dark:text-red-400'
  if (props.score < 90) return 'text-amber-600 dark:text-amber-400'
  return 'text-emerald-600 dark:text-emerald-400'
})
</script>