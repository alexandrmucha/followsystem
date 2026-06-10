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
useSeoMeta({
  description: t('landing.meta_description'),
  ogTitle: t('landing.page_title'),
  ogDescription: t('landing.meta_description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: t('landing.page_title'),
  twitterDescription: t('landing.meta_description'),
})
</script>
