<template>
  <div
    class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
    @click="$emit('close')"
  >
    <button
      type="button"
      class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
      :aria-label="$t('common.close')"
      @click="$emit('close')"
    >
      <LucideX :size="18" />
    </button>
    <img :src="src" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" @click.stop />
  </div>
</template>

<script setup lang="ts">
defineProps<{ src: string }>()
const emit = defineEmits<{ close: [] }>()

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
</script>
