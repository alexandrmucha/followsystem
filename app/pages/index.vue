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
const siteUrl = useRequestURL().origin

useHead({ titleTemplate: null, title: t('landing.page_title') })
useSeoMeta({
  description: t('landing.meta_description'),
  ogTitle: t('landing.page_title'),
  ogDescription: t('landing.meta_description'),
  ogType: 'website',
  ogImage: `${siteUrl}/img/og_image.png`,
  twitterCard: 'summary_large_image',
  twitterTitle: t('landing.page_title'),
  twitterDescription: t('landing.meta_description'),
  twitterImage: `${siteUrl}/img/og_image.png`,
})
</script>
