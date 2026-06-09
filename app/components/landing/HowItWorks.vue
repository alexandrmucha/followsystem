<template>
  <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-3">{{ $t('landing.how_it_works.title') }}</h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">{{ $t('landing.how_it_works.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="step in steps" :key="step.number" class="flex flex-col items-start">
          <div class="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mb-4 shrink-0">
            {{ step.number }}
          </div>
          <h3 class="text-base font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const steps = computed(() => [
  {
    number: '1',
    title: t('landing.how_it_works.steps.1.title'),
    description: t('landing.how_it_works.steps.1.description'),
  },
  {
    number: '2',
    title: t('landing.how_it_works.steps.2.title'),
    description: t('landing.how_it_works.steps.2.description'),
  },
  {
    number: '3',
    title: t('landing.how_it_works.steps.3.title'),
    description: t('landing.how_it_works.steps.3.description'),
  },
])
</script>
