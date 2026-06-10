<template>
  <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">{{ $t('landing.cta.title') }}</h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-8">{{ $t('landing.cta.subtitle') }}</p>
      <button
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white font-medium hover:from-indigo-600 hover:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer"
        @click="navigateTo('/sign-in')"
      >
        {{ $t('landing.cta.button') }}
        <LucideArrowRight :size="16" />
      </button>
    </div>
  </section>
</template>
