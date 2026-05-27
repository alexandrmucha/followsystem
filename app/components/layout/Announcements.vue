<template>
  <div v-if="hydrated && visibleAnnouncements.length">
    <div
      v-for="a in visibleAnnouncements"
      :key="a.id"
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
        @click="dismiss(a)"
        :title="$t('common.close')"
        :aria-label="$t('common.close')"
      >
        <LucideX :size="16" />
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
  updatedAt: string
}

/* =========================
   HYDRATION
========================= */

const hydrated = ref(false)

/* =========================
   FETCH
========================= */

const { data: announcements, refresh } = await useAsyncData<Announcement[]>(
  'active-announcements',
  () => $api('/announcements/active')
)

/* =========================
   LOCAL STORAGE
========================= */

const STORAGE_KEY = 'dismissed-announcements'
const dismissed = ref<Record<string, string>>({})

/* load */
onMounted(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    dismissed.value = stored ? JSON.parse(stored) : {}
  } catch {
    dismissed.value = {}
  }

  hydrated.value = true
})

/* save */
const saveDismissed = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dismissed.value))
}

/* =========================
   SCOPE (ONLY RENDER LOGIC)
========================= */

const scope = computed(() => {
  if (route.path.startsWith('/sign-in')) {
    return 'auth'
  }

  return 'app'
})

/* =========================
   DERIVED DATA (PURE)
========================= */

const visibleAnnouncements = computed(() => {
  const list = announcements.value ?? []

  return list.filter(a =>
    (a.scope === 'global' || a.scope === scope.value) &&
    dismissed.value[a.id] !== a.updatedAt
  )
})

/* =========================
   CLEANUP (NO SCOPE HERE)
========================= */

watch(
  announcements,
  (list) => {
    if (!list) return

    const allowedIds = new Set(list.map(a => a.id))

    const cleaned: Record<string, string> = {}

    for (const [id, updatedAt] of Object.entries(dismissed.value)) {
      if (allowedIds.has(id)) {
        cleaned[id] = updatedAt
      }
    }

    if (JSON.stringify(cleaned) !== JSON.stringify(dismissed.value)) {
      dismissed.value = cleaned
      saveDismissed()
    }
  },
  { immediate: true }
)

/* =========================
   HELPERS
========================= */

const dismiss = (a: Announcement) => {
  dismissed.value[a.id] = a.updatedAt
  saveDismissed()
}

/* =========================
   REFRESH ON ROUTE CHANGE
========================= */

watch(
  () => route.fullPath,
  () => refresh()
)

/* =========================
   STYLES
========================= */

const styles: Record<string, string> = {
  success: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
  error: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300',
  warning: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300',
  info: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
}
</script>