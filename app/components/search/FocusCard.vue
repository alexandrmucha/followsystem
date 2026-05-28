<template>
  <div
    :class="cardClass"
    @click="handleClick"
  >
    <div class="text-lg">
      <slot name="icon" />
    </div>

    <div class="font-medium mt-2">
      <slot name="title" />
    </div>

    <div class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
      <slot name="description" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  active: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['select'])

/* =========================
   CLICK HANDLER
========================= */
const handleClick = () => {
  if (props.disabled) return
  emit('select')
}

/* =========================
   CLASS LOGIC
========================= */
const cardClass = computed(() => [
  'rounded-lg border p-3 transition-colors',
  props.disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer',

  props.active
    ? 'border-indigo-500/40 dark:border-indigo-400/30 bg-indigo-500/5 dark:bg-indigo-500/5'
    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
])
</script>