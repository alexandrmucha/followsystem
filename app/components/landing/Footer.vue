<template>
  <footer class="border-t border-neutral-200 dark:border-neutral-800 py-8 px-6">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-500 dark:text-neutral-400">
      <UiLogo />
      <div class="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
        <NuxtLink to="/terms" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">{{ $t('landing.footer.terms') }}</NuxtLink>
        <NuxtLink to="/privacy" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">{{ $t('landing.footer.privacy') }}</NuxtLink>
        <a href="mailto:support@fulply.com" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">support@fulply.com</a>
      </div>
    </div>
  </footer>
</template>
