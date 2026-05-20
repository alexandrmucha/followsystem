<template>
  <div v-if="visibleAnnouncements.length">
    <div
      v-for="a in visibleAnnouncements"
      :key="a.id"
      v-show="isVisible(a.id)"
      :class="[
        'py-3 text-center text-sm relative pl-4 pr-10',
        styles[a.type]
      ]"
    >
      <!-- Message -->
      {{ a.message }}

      <!-- Close -->
      <button
        v-if="a.dismissible"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 cursor-pointer"
        @click="dismiss(a.id)"
        :title="$t('common.close')"
        :aria-label="$t('common.close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()

type Announcement = {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  dismissible: boolean
  scope: 'global' | 'app' | 'auth'
}

/* =========================
   FETCH
========================= */

const { data: announcements, refresh } = await useAsyncData<Announcement[]>(
  'active-announcements',
  () => $api('/announcements/active')
)

/* =========================
   VISIBILITY STATE PER ITEM
========================= */

const dismissed = ref<Set<string>>(new Set())

const isVisible = (id: string) => {
  return !dismissed.value.has(id)
}

const dismiss = (id: string) => {
  dismissed.value.add(id)
}

/* =========================
   FILTER BY SCOPE
========================= */

const scope = 'app' // 👈 sem později napojíš layout (app/auth/global)

const visibleAnnouncements = computed(() => {
  const list = announcements.value ?? []

  return list.filter(a =>
    a.scope === 'global' || a.scope === scope
  )
})

/* =========================
   STYLES
========================= */

const styles: Record<string, string> = {
  success: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
  error: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300',
  warning: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300',
  info: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
}

/* =========================
   REFRESH ON ROUTE CHANGE
========================= */

watch(
  () => route.fullPath,
  () => refresh()
)
</script>