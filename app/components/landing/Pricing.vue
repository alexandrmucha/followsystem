<template>
  <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
    <div class="max-w-5xl mx-auto">

      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-6">{{ $t('landing.pricing.title') }}</h2>

        <div class="inline-flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-1 text-sm">
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="rounded-2xl border p-6 flex flex-col gap-6 bg-white dark:bg-neutral-800"
          :class="plan.popular ? 'border-indigo-500/40 dark:border-indigo-500/30' : 'border-neutral-200 dark:border-neutral-700'"
        >
          <!-- name + badge -->
          <div>
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-sm font-medium" :class="plan.popular ? 'text-indigo-500' : 'text-neutral-500 dark:text-neutral-400'">
                {{ $t(plan.nameKey) }}
              </p>
              <span v-if="plan.popular" class="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-medium px-2 py-0.5 rounded-md">
                {{ $t('landing.pricing.popular_badge') }}
              </span>
            </div>
            <div>
              <span v-if="annual" class="text-sm text-neutral-400 dark:text-neutral-500 line-through">${{ plan.price * 12 }}</span>
              <div class="flex items-end gap-1">
                <span class="text-3xl font-bold">${{ annual ? plan.price * 10 : plan.price }}</span>
                <span class="text-neutral-500 dark:text-neutral-400 mb-1">{{ annual ? $t('landing.pricing.period_annual') : $t('landing.pricing.period') }}</span>
              </div>
            </div>
          </div>

          <!-- highlights -->
          <ul class="flex flex-col gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li v-for="key in plan.highlightKeys" :key="key" class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t(key) }}
            </li>
          </ul>

          <div class="border-t border-neutral-100 dark:border-neutral-700" />

          <!-- shared features -->
          <ul class="flex-1 flex flex-col gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li v-for="key in sharedFeatures" :key="key" class="flex items-start gap-2">
              <LucideCheck :size="15" class="text-emerald-500 mt-0.5 shrink-0" />
              {{ $t(key) }}
            </li>
          </ul>

          <UiBaseButton
            :variant="plan.popular ? 'magic' : plan.id === 'agency' ? 'primary' : 'secondary'"
            size="md"
            class="w-full"
            :class="plan.popular ? 'flex items-center justify-center gap-2' : ''"
            @click="navigateTo('/sign-in')"
          >
            <LucideSparkles v-if="plan.popular" :size="16" />
            {{ $t(plan.ctaKey) }}
          </UiBaseButton>
        </div>
      </div>

      <!-- trial note -->
      <p class="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {{ $t('landing.pricing.trial_note') }}
        <NuxtLink to="/sign-in" class="underline hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">{{ $t('landing.pricing.trial_cta') }}</NuxtLink>
      </p>

    </div>
  </section>
</template>

<script setup lang="ts">
const annual = ref(false)

const plans = [
  {
    id: 'starter',
    price: 39,
    popular: false,
    nameKey: 'landing.pricing.starter.name',
    highlightKeys: ['landing.pricing.starter.leads', 'landing.pricing.starter.emails'],
    ctaKey: 'landing.pricing.starter.cta',
  },
  {
    id: 'pro',
    price: 79,
    popular: true,
    nameKey: 'landing.pricing.pro.name',
    highlightKeys: ['landing.pricing.pro.leads', 'landing.pricing.pro.emails'],
    ctaKey: 'landing.pricing.pro.cta',
  },
  {
    id: 'agency',
    price: 149,
    popular: false,
    nameKey: 'landing.pricing.agency.name',
    highlightKeys: ['landing.pricing.agency.leads', 'landing.pricing.agency.emails'],
    ctaKey: 'landing.pricing.agency.cta',
  },
]

const sharedFeatures = [
  'landing.pricing.features.email_search',
  'landing.pricing.features.templates',
  'landing.pricing.features.ai_instructions',
  'landing.pricing.features.mark_contacted',
  'landing.pricing.features.export_csv',
]
</script>
