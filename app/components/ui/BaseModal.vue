<template>
  <div
    class="fixed inset-0 bg-black/20 flex items-start justify-center p-4 z-50 overflow-y-auto"
    @mousedown.self="handleOverlayClick"
  >
    <div
      :class="[
        'relative bg-white dark:bg-neutral-900 w-full rounded-2xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl my-auto',
        widthClass
      ]"
    >
      <!-- Close button -->
      <button
        type="button"
        class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
        :title="$t('common.close')"
        :aria-label="$t('common.close')"
        @click="close"
      >
        <LucideX :size="18" />
      </button>

      <!-- Header -->
      <h1
        v-if="title"
        class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 pr-8"
      >
        {{ title }}
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        class="text-sm text-neutral-600 dark:text-neutral-400 mb-4"
      >
        {{ description }}
      </p>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'

  closeOnEsc?: boolean
  closeOnOverlay?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const widthClass = computed(() => {
  switch (props.size ?? 'md') {
    case 'sm':
      return 'max-w-sm'
    case 'md':
      return 'max-w-md'
    case 'lg':
      return 'max-w-xl'
    case 'xl':
      return 'max-w-2xl'
  }
})

const close = () => emit('close')

const handleOverlayClick = () => {
  if (props.closeOnOverlay !== false) {
    close()
  }
}

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc !== false) {
    close()
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'

  if (props.closeOnEsc !== false) {
    window.addEventListener('keydown', handleEsc)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleEsc)
})
</script>