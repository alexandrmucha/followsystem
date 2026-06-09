<template>
  <div
    class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
    @click="$emit('close')"
  >
    <img
      :src="src"
      class="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
      @click.stop
    />
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
