<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="inline-block text-sm text-neutral-700 dark:text-neutral-300 mb-1"
    >
      {{ label }}
    </label>

    <select
      :id="id"
      v-model="model"
      :disabled="disabled"
      class="w-full bg-white dark:bg-neutral-900 rounded-lg border text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2"
      :class="[sizeClass, selectClass, disabledClass]"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number>()

defineEmits(['focus', 'blur'])

const props = defineProps<{
  label?: string
  error?: boolean
  disabled?: boolean
  size?: 'md' | 'sm'
}>()

const id = useId()

/* =========================
   SIZE
========================= */
const sizeClass = computed(() => {
  const size = props.size ?? 'md'

  if (size === 'sm') {
    return 'px-3 py-1.5 text-sm'
  }

  return 'px-3 py-2 text-sm'
})

/* =========================
   BORDER / STATES
========================= */
const selectClass = computed(() => {
  if (props.error) {
    return 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-500'
  }

  return 'border-neutral-200 dark:border-neutral-700 focus:border-neutral-300 dark:focus:border-neutral-600 focus:ring-neutral-300 dark:focus:ring-neutral-600'
})

const disabledClass = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : ''
})
</script>