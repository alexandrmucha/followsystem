<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
      {{ $t('onboarding.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('onboarding.description') }}
    </p>

    <DashboardOnboardingSteps :active-step="1" />

  </div>
</template>

<script lang="ts" setup>
</script>