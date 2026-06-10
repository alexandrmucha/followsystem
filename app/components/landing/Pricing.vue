<template>
  <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-3">{{ $t('landing.pricing.title') }}</h2>
        <p class="text-neutral-600 dark:text-neutral-400">{{ $t('landing.pricing.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">

        <!-- Trial -->
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col gap-6">
          <div>
            <p class="text-sm font-medium text-neutral-500 dark:text-neutral-400">{{ $t('landing.pricing.trial.name') }}</p>
            <p class="mt-1 text-3xl font-bold">{{ $t('landing.pricing.trial.price_label') }}</p>
          </div>
          <ul class="flex flex-col gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
            <li class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t('landing.pricing.trial.leads') }}
            </li>
            <li class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t('landing.pricing.trial.emails') }}
            </li>
            <li v-for="key in sharedFeatures" :key="key" class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t(key) }}
            </li>
          </ul>
          <UiBaseButton variant="secondary" size="md" class="w-full" @click="navigateTo('/sign-in')">
            {{ $t('landing.pricing.trial.cta') }}
          </UiBaseButton>
        </div>

        <!-- Pro -->
        <div class="rounded-2xl border border-indigo-500/40 dark:border-indigo-500/30 bg-white dark:bg-neutral-900 p-6 flex flex-col gap-6">
          <div>
            <p class="text-sm font-medium text-indigo-500">{{ $t('landing.pricing.pro.name') }}</p>
            <div class="mt-1 flex items-end gap-1">
              <span class="text-3xl font-bold">${{ $t('landing.pricing.pro.price') }}</span>
              <span class="text-neutral-500 dark:text-neutral-400 mb-1">{{ $t('landing.pricing.pro.period') }}</span>
            </div>
          </div>
          <ul class="flex flex-col gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
            <li class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t('landing.pricing.pro.leads') }}
            </li>
            <li class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t('landing.pricing.pro.emails') }}
            </li>
            <li v-for="key in sharedFeatures" :key="key" class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t(key) }}
            </li>
          </ul>
          <UiBaseButton variant="magic" size="md" class="w-full flex items-center justify-center gap-2" @click="navigateTo('/sign-in')">
            <LucideSparkles :size="16" />
            {{ $t('landing.pricing.pro.cta') }}
          </UiBaseButton>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sharedFeatures = [
  'landing.pricing.features.email_search',
  'landing.pricing.features.templates',
  'landing.pricing.features.ai_instructions',
  'landing.pricing.features.mark_contacted',
  'landing.pricing.features.export_csv',
]
</script>
