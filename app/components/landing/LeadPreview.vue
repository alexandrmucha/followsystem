<template>
  <section class="py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-3">{{ $t('landing.lead_preview.title') }}</h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">{{ $t('landing.lead_preview.subtitle') }}</p>
      </div>

      <!-- mock card -->
      <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">

        <!-- mock search bar -->
        <div class="px-5 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <div class="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <LucideSearch :size="13" class="text-neutral-400 shrink-0" />
            <span class="text-sm text-neutral-500 dark:text-neutral-400">instalatér · Praha</span>
          </div>
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400">
            <LucideActivity :size="13" />
            3 / 12 {{ $t('landing.lead_preview.analyzed') }}
          </div>
        </div>

        <!-- leads list -->
        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">

          <!-- lead 1 — done, high score -->
          <div class="px-5 py-4">
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-3 md:gap-4 w-full min-w-0">
              <div class="min-w-0">
                <h3 class="truncate font-medium text-sm">Instalatér Novák s.r.o.</h3>
                <span class="mt-1 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                  <LucidePhone :size="13" />
                  +420 602 123 456
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-3 md:justify-end">
                <span class="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
                  <LucideStar :size="16" />
                  4.2
                  <span class="text-neutral-400 dark:text-neutral-500">(87)</span>
                </span>
                <span class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-default">Web</span>
                <!-- lead score -->
                <SearchPageSpeedBadge :label="$t('search.results.lead_score_label.good')" :score="34" :magic="true" />
                <div class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800">
                  {{ $t('search.results.badge.done') }}
                </div>
              </div>
            </div>
            <!-- pagespeed badges -->
            <div class="mt-4 flex flex-wrap gap-2">
              <SearchPageSpeedBadge :label="$t('search.results.categories.performance_mobile')" :score="28" />
              <SearchPageSpeedBadge :label="$t('search.results.categories.performance_desktop')" :score="54" />
              <SearchPageSpeedBadge :label="$t('search.results.categories.seo')" :score="47" />
              <SearchPageSpeedBadge :label="$t('search.results.categories.accessibility')" :score="47" />
              <SearchPageSpeedBadge :label="$t('search.results.categories.best_practices')" :score="62" />
            </div>
            <!-- metric badges -->
            <div class="mt-3 flex flex-wrap items-center gap-4">
              <SearchMetricBadge :value="4.2" type="lcp" :aria-label="$t('search.results.metrics.lcp')">
                <template #icon><LucideClock :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="1.1" type="size" :aria-label="$t('search.results.metrics.size')">
                <template #icon><LucideHardDrive :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="false" type="boolean" :aria-label="$t('search.results.ssl.no')">
                <template #icon><LucideLockOpen :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="false" type="boolean" :aria-label="$t('search.results.ai.not_responsive')">
                <template #icon><LucideSmartphone :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="true" type="boolean" :aria-label="$t('search.results.metrics.own_domain')">
                <template #icon><LucideLink :size="13" /></template>
              </SearchMetricBadge>

              <span class="w-px h-3 bg-neutral-200 dark:bg-neutral-700 self-center" />

              <SearchMetricBadge :value="true" type="boolean" :aria-label="$t('search.results.ai.has_own_website')">
                <template #icon><LucideGlobe :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="true" type="boolean" :aria-label="$t('search.results.ai.no_web_builder')">
                <template #icon><LucideBlocks :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="true" type="boolean" :aria-label="$t('search.results.ai.no_server_errors')">
                <template #icon><LucideServerCrash :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="false" type="boolean" :aria-label="$t('search.results.ai.has_placeholder_content')">
                <template #icon><LucideFileQuestion :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="2013" type="year" :aria-label="$t('search.results.ai.copyright_year')">
                <template #icon><LucideCopyright :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="'missing'" type="cta">
                <template #icon><LucideMousePointer :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="41" type="score" :aria-label="$t('search.results.ai.design')">
                <template #icon><LucidePaintbrush :size="13" /></template>
              </SearchMetricBadge>
              <SearchMetricBadge :value="28" type="score" :aria-label="$t('search.results.ai.copywriting')">
                <template #icon><LucidePenLine :size="13" /></template>
              </SearchMetricBadge>
            </div>
            <!-- screenshots -->
            <div class="mt-4 flex gap-3">
              <div class="flex flex-col items-center gap-1">
                <div class="w-14 h-20 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <LucideSmartphone :size="16" class="text-neutral-300 dark:text-neutral-600" />
                </div>
                <span class="text-xs text-neutral-400 dark:text-neutral-500">{{ $t('search.results.screenshot_mobile') }}</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="w-24 h-16 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <LucideMonitor :size="16" class="text-neutral-300 dark:text-neutral-600" />
                </div>
                <span class="text-xs text-neutral-400 dark:text-neutral-500">{{ $t('search.results.screenshot_desktop') }}</span>
              </div>
            </div>
            <!-- actions -->
            <div class="mt-4 flex flex-wrap sm:justify-end gap-3">
              <button class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-default">
                {{ $t('search.results.mark_contacted') }}
              </button>
              <button class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-linear-to-r from-violet-500 to-purple-600 text-white cursor-default">
                <LucideSparkles :size="13" />
                {{ $t('search.results.generate_email') }}
              </button>
            </div>
          </div>

          <!-- lead 2 — analyzing -->
          <div class="px-5 py-4 opacity-70">
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-3 md:gap-4 w-full min-w-0">
              <div class="min-w-0">
                <h3 class="truncate font-medium text-sm">Vodoinstalace Praha — Petr Horáček</h3>
                <span class="mt-1 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                  <LucidePhone :size="13" />
                  +420 777 654 321
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-3 md:justify-end">
                <span class="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
                  <LucideStar :size="16" />
                  3.8
                  <span class="text-neutral-400 dark:text-neutral-500">(23)</span>
                </span>
                <div class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800">
                  {{ $t('search.results.badge.analyzing') }}
                </div>
              </div>
            </div>
          </div>

          <!-- lead 3 — pending -->
          <div class="px-5 py-4 opacity-40">
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-3 md:gap-4 w-full min-w-0">
              <div class="min-w-0">
                <h3 class="truncate font-medium text-sm">Instalatérství Dvořák</h3>
              </div>
              <div class="flex flex-wrap items-center gap-3 md:justify-end">
                <div class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 ring-1 ring-neutral-200 dark:ring-neutral-700">
                  {{ $t('search.results.badge.pending') }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
