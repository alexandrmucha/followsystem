<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
    <LayoutAnnouncements />

    <div class="px-4 sm:px-6 lg:px-8 flex flex-col sm:my-auto py-12">
      <div class="w-full max-w-md mx-auto">
        <NuxtLink to="/" class="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors flex items-center space-x-2 mb-3">
          <LucideArrowLeft :size="16" />
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