<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

    <UiBaseCard :active="activeStep === 1">
      <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {{ $t('onboarding.steps.connect_email.title') }}
      </div>
      <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {{ $t('onboarding.steps.connect_email.description') }}
      </div>
    </UiBaseCard>

    <UiBaseCard :active="activeStep === 2">
      <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {{ $t('onboarding.steps.create_campaign.title') }}
      </div>
      <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {{ $t('onboarding.steps.create_campaign.description') }}
      </div>
    </UiBaseCard>

    <UiBaseCard :active="activeStep === 3">
      <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {{ $t('onboarding.steps.add_leads.title') }}
      </div>
      <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {{ $t('onboarding.steps.add_leads.description') }}
      </div>
    </UiBaseCard>

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