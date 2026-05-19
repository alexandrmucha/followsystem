<template>
  <div>
    <!-- User button -->
    <button ref="buttonRef" @click="openDropdown = !openDropdown" type="button" class="flex space-x-2 items-center text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors px-3 py-2 rounded-lg">
      <img v-if="authStore.user?.avatar" :src="authStore.user?.avatar" class="w-6 h-6 rounded-full" alt="avatar" />
      <span class="hidden sm:inline">{{ authStore.user?.email }}</span>
    </button>

    <!-- Dropdown -->
    <div v-if="openDropdown" ref="dropdownRef" class="absolute flex flex-col right-6 top-14 w-48 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm py-1 z-50">
      <NuxtLink to="/settings" class="flex gap-2 items-center px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" @click="openDropdown = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
        <span>{{ $t('nav.settings') }}</span>
      </NuxtLink>

      <button class="flex gap-2 items-center px-3 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 cursor-pointer transition-colors" @click="logout">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg></span>
        <span>{{ $t('auth.common.logout') }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

/* =========================
   STATE
========================= */

const openDropdown = ref(false)

/* refs */
const dropdownRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)

/* =========================
   LOGOUT
========================= */

const logout = async () => {
  openDropdown.value = false
  await authStore.logout()
}

/* =========================
   OUTSIDE CLICK
========================= */

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node

  const clickedInsideDropdown =
    dropdownRef.value?.contains(target)

  const clickedButton =
    buttonRef.value?.contains(target)

  if (!clickedInsideDropdown && !clickedButton) {
    openDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>