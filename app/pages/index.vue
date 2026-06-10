<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

    <LandingNavbar />
    <LandingHero />
    <LandingHowItWorks />
    <LandingLeadPreview />
    <LandingPricing />
    <LandingFaq />

    <LandingCta />

    <LandingFooter />

  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Fulply — Get clients who actually need a new website' })
</script>
