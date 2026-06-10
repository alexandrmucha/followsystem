<template>
  <div class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5" :class="magic ? 'bg-indigo-50 dark:bg-indigo-950/30 ring-1 ring-indigo-300 dark:ring-indigo-700' : 'bg-neutral-50 dark:bg-neutral-800'">
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
  magic?: boolean
}>()

const scoreColor = computed(() => {
  if (props.magic) return 'text-indigo-600 dark:text-indigo-400'
  if (props.score === null || props.score === undefined) return 'text-neutral-400 dark:text-neutral-500'
  if (props.score < 50) return 'text-red-600 dark:text-red-400'
  if (props.score < 90) return 'text-amber-600 dark:text-amber-400'
  return 'text-emerald-600 dark:text-emerald-400'
})
</script>