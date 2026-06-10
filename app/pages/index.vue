<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

    <LandingNavbar />
    <LandingHero />
    <LandingHowItWorks />
    <LandingLeadPreview />
    <LandingPricing />

    <!-- FINAL CTA -->
    <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Start getting clients today.</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mb-8">No credit card. No setup. Just sign in.</p>
        <button
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/20"
          @click="navigateTo('/sign-in')"
        >
          Try for free
          <LucideArrowRight :size="16" />
        </button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-neutral-200 dark:border-neutral-800 py-8 px-6">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-500 dark:text-neutral-400">
        <UiLogo />
        <a href="mailto:support@fulply.com" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          support@fulply.com
        </a>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Fulply — Get clients who actually need a new website' })
</script>
