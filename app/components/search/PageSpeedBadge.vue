<template>
  <div class="flex items-center gap-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1.5">
    <span class="text-xs text-neutral-500 dark:text-neutral-400">
      {{ label }}
    </span>
    <span class="text-xs font-semibold" :class="scoreColor">
      {{ displayValue }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string
  score: number | null | undefined
  isBool?: boolean
}>()

const { t } = useI18n()

const displayValue = computed(() => {
  if (props.score == null) return '--'
  if (props.isBool) return props.score === 100 ? t('common.yes') : t('common.no')
  return props.score
})

const scoreColor = computed(() => {
  if (props.score == null) return 'text-neutral-400 dark:text-neutral-500'
  if (props.isBool) return props.score === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
  if (props.score < 50) return 'text-red-600 dark:text-red-400'
  if (props.score < 90) return 'text-amber-600 dark:text-amber-400'
  return 'text-emerald-600 dark:text-emerald-400'
})
</script>