<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

    <LandingNavbar />
    <LandingHero />
    <LandingHowItWorks />
    <LandingLeadPreview />
    <LandingPricing />
    <LandingFaq />

    <LandingCta />

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
