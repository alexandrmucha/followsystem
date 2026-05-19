<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex">
    <Sidebar />

    <div class="flex flex-col grow transition-all duration-300" :class="sidebarOpen.desktop ? 'md:ml-64' : 'ml-0'">
      <AppHeader />
      
      <div class="py-6 px-4 sm:px-6 md:px-8">
        <div v-if="alertStore.alert" class="mb-6 max-w-2xl">
          <BaseAlert
            :type="alertStore.alert.type"
            :title="alertStore.alert.type === 'error' ? $t('common.error') : undefined"
            :message="alertStore.alert.message"
            :dismissible="alertStore.alert.dismissible"
            @dismiss="alertStore.clear()"
          >
            <template v-if="alertStore.alert.type === 'success'" #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </template>

            <template v-else-if="alertStore.alert.type === 'error'" #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </template>
          </BaseAlert>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = useSidebar()
const alertStore = useAlertStore()

const sidebarOpen = computed(() => sidebar.sidebarOpen.value)
</script>