<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
    <LayoutAnnouncements />

    <div class="px-4 sm:px-6 lg:px-8 flex flex-col my-auto py-12">
      <div class="w-full max-w-md mx-auto">
        <NuxtLink to="/" class="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors flex items-center space-x-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <span>{{ $t('auth.common.back_home') }}</span>
        </NuxtLink>

        <UiLogo />
      </div>

      <div class="flex flex-col items-center">
        <LayoutAlerts />

        <slot />
      </div>
        
     </div>
     
  </div>
</template>