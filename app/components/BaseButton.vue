<template>
  <button :type="type" :disabled="disabled" class="w-full rounded-lg py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700" :class="buttonClass">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()

const buttonClass = computed(() => {
  if (props.disabled) {
    return 'bg-neutral-900 dark:bg-neutral-800 text-white opacity-50'
  }

  return 'bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-neutral-800 dark:hover:bg-neutral-700 cursor-pointer'
})
</script>