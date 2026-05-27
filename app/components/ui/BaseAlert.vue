<template>
  <div :class="wrapperClass">
    <!-- Icon -->
    <div class="mt-0.5" :class="iconClass">
      <slot name="icon" />
    </div>

    <!-- Content -->
    <div class="flex-1">
      <h3 v-if="title" :class="titleClass">
        {{ title }}
      </h3>

      <p v-if="message" :class="messageClass">
        {{ message }}
      </p>

      <p v-if="hint" :class="hintClass">
        {{ hint }}
      </p>

      <slot />
    </div>

    <!-- Close button -->
    <button v-if="dismissible" type="button" class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 cursor-pointer" @click="emit('dismiss')" :title="$t('common.close')" :aria-label="$t('common.close')">
      <LucideX :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (v: string) =>
      ['success', 'error', 'info', 'warning'].includes(v)
  },
  title: String,
  message: String,
  hint: String,
  dismissible: {
    type: Boolean,
    default: false
  }
})

/* =========================
   STYLE SYSTEM (light + dark)
========================= */

const styles: Record<string, any> = {
  success: {
    wrapper: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500/30 dark:border-emerald-400/20',
    icon: 'text-emerald-600 dark:text-emerald-400',
    title: 'text-emerald-800 dark:text-emerald-200',
    message: 'text-emerald-700 dark:text-emerald-300',
    hint: 'text-emerald-600 dark:text-emerald-400'
  },
  error: {
    wrapper: 'bg-red-50 dark:bg-red-950/20 border-red-500/30 dark:border-red-400/20',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
    hint: 'text-red-600 dark:text-red-400'
  },
  warning: {
    wrapper: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-500/30 dark:border-yellow-400/20',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-200',
    message: 'text-yellow-700 dark:text-yellow-300',
    hint: 'text-yellow-600 dark:text-yellow-400'
  },
  info: {
    wrapper: 'bg-blue-50 dark:bg-blue-950/20 border-blue-500/30 dark:border-blue-400/20',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    message: 'text-blue-700 dark:text-blue-300',
    hint: 'text-blue-600 dark:text-blue-400'
  }
}

const config = computed(() => styles[props.type])

const wrapperClass = computed(
  () =>
    `p-4 sm:p-5 rounded-2xl border flex gap-4 items-start ${config.value.wrapper}`
)

const iconClass = computed(() => config.value.icon)
const titleClass = computed(() => `font-semibold ${config.value.title}`)
const messageClass = computed(() => `text-sm mt-1 ${config.value.message}`)
const hintClass = computed(() => `text-xs mt-2 ${config.value.hint}`)
</script>