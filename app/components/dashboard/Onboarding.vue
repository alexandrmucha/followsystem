<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
      {{ $t('onboarding.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('onboarding.description') }}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Step 1 -->
      <UiBaseCard active>
        <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {{ $t('onboarding.steps.connect_email.title') }}
        </div>
        <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {{ $t('onboarding.steps.connect_email.description') }}
        </div>
      </UiBaseCard>

      <!-- Step 2 -->
       <UiBaseCard class="p-5">
        <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {{ $t('onboarding.steps.create_campaign.title') }}
        </div>
        <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {{ $t('onboarding.steps.create_campaign.description') }}
        </div>
      </UiBaseCard>

      <!-- Step 3 -->
       <UiBaseCard class="p-5">
        <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {{ $t('onboarding.steps.add_leads.title') }}
        </div>
        <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {{ $t('onboarding.steps.add_leads.description') }}
        </div>
      </UiBaseCard>
      

    </div>

  </div>
</template>

<script lang="ts" setup>
</script>