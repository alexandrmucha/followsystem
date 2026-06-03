<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="inline-block text-sm text-neutral-700 dark:text-neutral-300 mb-1"
    >
      {{ label }}
    </label>

    <textarea
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      v-model="model"
      class="w-full bg-white dark:bg-neutral-900 rounded-lg border text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
      :class="[inputClass, disabledClass]"
    />

    <div v-if="maxlength !== undefined" class="flex justify-end mt-1">
      <span class="text-xs" :class="counterClass">{{ model?.length ?? 0 }} / {{ maxlength }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

const props = defineProps<{
  label?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  rows?: number
  maxlength?: number
}>()

const id = useId()

const inputClass = computed(() => {
  if (props.error) {
    return 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-500'
  }
  return 'border-neutral-200 dark:border-neutral-700 focus:border-neutral-300 dark:focus:border-neutral-600 focus:ring-neutral-300 dark:focus:ring-neutral-600'
})

const disabledClass = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : ''
})

const counterClass = computed(() => {
  if (!props.maxlength) return ''
  const remaining = props.maxlength - (model.value?.length ?? 0)
  if (remaining <= Math.ceil(props.maxlength * 0.05)) return 'text-red-500 dark:text-red-400'
  if (remaining <= Math.ceil(props.maxlength * 0.20)) return 'text-amber-500 dark:text-amber-400'
  return 'text-neutral-400 dark:text-neutral-500'
})
</script>