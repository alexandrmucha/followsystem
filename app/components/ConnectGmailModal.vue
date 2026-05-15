<template>
  <div class="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div class="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">

      <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {{ $t('connect_gmail.title') }}
      </h1>

      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        {{ $t('connect_gmail.description') }}
      </p>

      <ul class="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
        <li>{{ $t(('connect_gmail.bullet_1')) }}</li>
        <li>{{ $t(('connect_gmail.bullet_2')) }}</li>
        <li>{{ $t(('connect_gmail.bullet_3')) }}</li>
      </ul>

      <div class="space-y-3">
        <BaseButton type="button" :disabled="loading" @click="handleConnect">
          {{ $t('connect_gmail.button') }}
        </BaseButton>

        <BaseButton type="button" :disabled="loading" variant="secondary" @click="close">
          {{ $t('connect_gmail.not_now') }}
        </BaseButton>
      </div>

      <p class="text-xs text-neutral-400 mt-4 text-center">
        {{ $t('connect_gmail.disclaimer') }}
      </p>

    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "close"): void
}>()

const supabase = useSupabaseClient()

const loading = ref(false)

const handleConnect = async () => {
  if (loading.value) return

  loading.value = true

}

const close = () => {
  emit("close")
}

onMounted(() => {
  document.body.style.overflow = "hidden"
})

onUnmounted(() => {
  document.body.style.overflow = ""
})
</script>