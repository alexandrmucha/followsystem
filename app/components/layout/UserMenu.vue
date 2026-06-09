<template>
  <div>
    <!-- User button -->
    <button ref="buttonRef" @click="openDropdown = !openDropdown" type="button" class="flex space-x-2 items-center text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors px-3 py-2 rounded-lg">
      <LucideUser :size="24" />

      <span class="hidden sm:inline">{{ authStore.user?.email }}</span>
    </button>

    <!-- Dropdown -->
    <div v-if="openDropdown" ref="dropdownRef" class="absolute flex flex-col right-6 top-14 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm py-1 z-50">
      <NuxtLink to="/settings" class="flex gap-2 items-center px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" @click="openDropdown = false">
        <LucideSettings :size="16" />
        <span>{{ $t('nav.settings') }}</span>
      </NuxtLink>

      <button class="flex gap-2 items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors" @click="logout">
        <span>
          <LucideLogOut :size="16" />
        </span>
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
