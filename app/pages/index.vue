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

const { t } = useI18n()
useHead({ titleTemplate: null, title: t('landing.page_title') })
</script>
