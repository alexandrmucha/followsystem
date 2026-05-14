<template>
  <div :class="wrapperClass">
    <!-- Icon -->
    <div class="mt-0.5" :class="iconClass">
      <slot name="icon" />
    </div>

    <!-- Content -->
    <div>
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
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (v: string) =>
      ['success', 'error', 'info', 'warning'].includes(v)
  },
  title: String,
  message: String,
  hint: String
})

/* =========================
   STYLE SYSTEM (light + dark)
========================= */

const styles: Record<string, any> = {
  success: {
    wrapper: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900',
    icon: 'text-emerald-600 dark:text-emerald-400',
    title: 'text-emerald-800 dark:text-emerald-200',
    message: 'text-emerald-700 dark:text-emerald-300',
    hint: 'text-emerald-600 dark:text-emerald-400'
  },
  error: {
    wrapper: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
    hint: 'text-red-600 dark:text-red-400'
  },
  warning: {
    wrapper: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-200',
    message: 'text-yellow-700 dark:text-yellow-300',
    hint: 'text-yellow-600 dark:text-yellow-400'
  },
  info: {
    wrapper: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900',
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