<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

    <DashboardOnboardingStep
      :index="1"
      :active="activeStep === 1"
      :done="activeStep > 1"
      :title="$t('onboarding.steps.connect_email.title')"
      :description="$t('onboarding.steps.connect_email.description')"
    />

    <DashboardOnboardingStep
      :index="2"
      :active="activeStep === 2"
      :done="activeStep > 2"
      :title="$t('onboarding.steps.create_campaign.title')"
      :description="$t('onboarding.steps.create_campaign.description')"
    />

    <DashboardOnboardingStep
      :index="3"
      :active="activeStep === 3"
      :done="false"
      :title="$t('onboarding.steps.add_leads.title')"
      :description="$t('onboarding.steps.add_leads.description')"
    />

  </div>
</template>

<script setup lang="ts">
defineProps({
  activeStep: {
    type: Number,
    default: 1,
  },
})
</script>