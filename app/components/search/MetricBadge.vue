<template>
  <span
    class="flex items-center gap-1.5 text-xs"
    :class="valueColor"
    :aria-label="ariaLabel"
    :title="ariaLabel"
  >
    <slot name="icon" />
    {{ displayValue }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: number | boolean | string | null | undefined
  type: 'lcp' | 'size' | 'cta' | 'boolean' | 'score'
  ariaLabel?: string
}>()

const { t } = useI18n()

const displayValue = computed(() => {
  if (props.value == null) return '--'
  if (props.type === 'cta') {
    if (props.value === 'ok') return t('search.results.ai.cta_ok')
    if (props.value === 'missing') return t('search.results.ai.cta_missing')
    if (props.value === 'missing_mobile') return t('search.results.ai.cta_missing_mobile')
    if (props.value === 'missing_desktop') return t('search.results.ai.cta_missing_desktop')
    return '--'
  }
  if (props.type === 'boolean') return props.ariaLabel ?? '--'
  if (props.type === 'lcp') return `${props.value} s`
  if (props.type === 'size') return `${props.value} MB`
  return props.value
})

const valueColor = computed(() => {
  if (props.value == null) return 'text-neutral-400 dark:text-neutral-500'
  if (props.type === 'cta') {
    if (props.value === 'ok') return 'text-emerald-600 dark:text-emerald-400'
    if (props.value === 'missing') return 'text-red-600 dark:text-red-400'
    return 'text-amber-600 dark:text-amber-400'
  }

  if (props.type === 'boolean') {
    return props.value
      ? 'text-emerald-600 dark:text-emerald-400'
      : 'text-red-600 dark:text-red-400'
  }

  if (props.type === 'score') {
    const v = props.value as number
    if (v >= 90) return 'text-emerald-600 dark:text-emerald-400'
    if (v >= 50) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  if (props.type === 'lcp') {
    const v = props.value as number
    if (v <= 2.5) return 'text-emerald-600 dark:text-emerald-400'
    if (v <= 4) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  if (props.type === 'size') {
    const v = props.value as number
    if (v <= 1.6) return 'text-emerald-600 dark:text-emerald-400'
    if (v <= 3) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  return 'text-neutral-500 dark:text-neutral-400'
})
</script>