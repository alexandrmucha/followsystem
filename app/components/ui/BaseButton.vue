<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
    :class="[buttonClass, sizeClass]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'md' | 'sm'
}>()

/* =========================
   SIZE
========================= */

const sizeClass = computed(() => {
  const size = props.size ?? 'md'

  if (size === 'sm') {
    return 'px-3 py-1.5 text-sm'
  }

  return 'px-4 py-2 text-sm'
})

/* =========================
   VARIANTS
========================= */

const buttonClass = computed(() => {
  const variant = props.variant ?? 'primary'

  if (props.disabled) {
    if (variant === 'secondary') {
      return 'bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 opacity-50'
    }

    if (variant === 'danger') {
      return 'bg-red-600 text-white opacity-50'
    }

    return 'bg-neutral-900 dark:bg-neutral-800 text-white opacity-50'
  }

  if (variant === 'secondary') {
    return `
      bg-transparent
      border border-neutral-300 dark:border-neutral-700
      text-neutral-900 dark:text-neutral-100
      hover:bg-neutral-100 dark:hover:bg-neutral-800
      cursor-pointer
    `
  }

  if (variant === 'danger') {
    return `
      bg-red-600
      text-white
      hover:bg-red-700
      cursor-pointer
    `
  }

  return `
    bg-neutral-900 dark:bg-neutral-800
    text-white
    hover:bg-neutral-800 dark:hover:bg-neutral-700
    cursor-pointer
  `
})
</script>