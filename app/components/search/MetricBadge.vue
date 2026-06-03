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
  value: number | boolean | null | undefined
  type: 'lcp' | 'size' | 'ssl' | 'viewport'
  ariaLabel?: string
}>()

const { t } = useI18n()

const displayValue = computed(() => {
  if (props.value === undefined) return '--'
  if (props.type === 'ssl') {
    if (props.value === null) return t('search.results.ssl.no_redirect')
    return props.value ? t('search.results.ssl.yes') : t('search.results.ssl.no')
  }
  if (props.value === null) return '--'
  if (props.type === 'viewport') return props.value ? t('search.results.viewport.yes') : t('search.results.viewport.no')
  if (props.type === 'lcp') return `${props.value} s`
  if (props.type === 'size') return `${props.value} MB`
  return props.value
})

const valueColor = computed(() => {
  if (props.value === undefined) return 'text-neutral-400 dark:text-neutral-500'
  if (props.value === null) {
    if (props.type === 'ssl') return 'text-amber-500 dark:text-amber-400'
    return 'text-neutral-400 dark:text-neutral-500'
  }

  if (props.type === 'ssl' || props.type === 'viewport') {
    return props.value
      ? 'text-emerald-600 dark:text-emerald-400'
      : 'text-red-600 dark:text-red-400'
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