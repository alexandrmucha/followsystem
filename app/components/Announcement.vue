<template>
  <div
    v-if="visible && announcement"
    :class="[
      'py-3 text-center text-sm relative pl-4 pr-10',
      styles[announcement.type]
    ]"
  >
    <!-- Message -->
    {{ announcement.message }}

    <!-- Close -->
    <button
      v-if="announcement.dismissible"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 cursor-pointer"
      @click="visible = false"
      :title="$t('common.close')"
      :aria-label="$t('common.close')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

const visible = ref(true)

/* =========================
   FETCH ANNOUNCEMENT
========================= */

type Announcement = {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  dismissible: boolean
}

const { data: announcement } = await useAsyncData<Announcement | null>(
  'active-announcement',
  () => $api('/announcements/active')
)

/* =========================
   STYLES
========================= */

const styles: Record<string, string> = {
  success:
    'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
  error:
    'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300',
  warning:
    'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300',
  info:
    'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
}
</script>