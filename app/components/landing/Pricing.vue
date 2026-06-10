<template>
  <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-3">{{ $t('landing.pricing.title') }}</h2>
        <p class="text-neutral-600 dark:text-neutral-400">{{ $t('landing.pricing.subtitle') }}</p>

        <!-- billing toggle -->
        <div class="mt-6 inline-flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-1 text-sm">
          <button
            class="px-3 py-1.5 rounded-md transition-colors cursor-pointer"
            :class="annual ? 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200' : 'bg-neutral-100 dark:bg-neutral-700 font-medium'"
            @click="annual = false"
          >
            {{ $t('landing.pricing.monthly') }}
          </button>
          <button
            class="px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-2"
            :class="annual ? 'bg-neutral-100 dark:bg-neutral-700 font-medium' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'"
            @click="annual = true"
          >
            {{ $t('landing.pricing.annual') }}
            <span class="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-medium px-2 py-0.5 rounded-md">{{ $t('landing.pricing.annual_save') }}</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <!-- Trial -->
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col gap-6">
          <div>
            <p class="text-sm font-medium text-neutral-500 dark:text-neutral-400">{{ $t('landing.pricing.trial.name') }}</p>
            <p class="mt-1 text-3xl font-bold">{{ $t('landing.pricing.trial.price_label') }}</p>
          </div>
          <ul class="flex-1 flex flex-col gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
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
            <div class="mt-1">
              <span v-if="annual" class="text-base text-neutral-400 dark:text-neutral-500 line-through">${{ PRICE_MONTHLY * 12 }}</span>
              <div class="flex items-end gap-1">
                <span class="text-3xl font-bold">${{ annual ? PRICE_ANNUAL : PRICE_MONTHLY }}</span>
                <span class="text-neutral-500 dark:text-neutral-400 mb-1">{{ annual ? $t('landing.pricing.pro.period_annual') : $t('landing.pricing.pro.period_monthly') }}</span>
              </div>
            </div>
          </div>
          <ul class="flex-1 flex flex-col gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
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
const annual = ref(false)

const PRICE_MONTHLY = 49
const PRICE_ANNUAL = 490

const sharedFeatures = [
  'landing.pricing.features.email_search',
  'landing.pricing.features.templates',
  'landing.pricing.features.ai_instructions',
  'landing.pricing.features.mark_contacted',
  'landing.pricing.features.export_csv',
]
</script>
