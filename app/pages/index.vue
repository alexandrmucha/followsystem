<template>
  <LandingHero />
  <LandingHowItWorks />
  <LandingLeadPreview />
  <LandingPricing />
  <LandingFaq />
  <LandingCta />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'landing' })
useHead({ title: 'Fulply — Get clients who actually need a new website' })
</script>
