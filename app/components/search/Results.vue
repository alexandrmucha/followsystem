<template>
  <div class="mt-6">
    <UiBaseCard>

      <div class="divide-y divide-neutral-300 dark:divide-neutral-700">

        <div v-for="lead in leads" :key="lead.googlePlaceId" class="flex items-center justify-between gap-4 py-4">

          <!-- LEFT -->
          <div class="min-w-0 flex-1">

            <!-- NAME -->
            <h3 class="truncate font-medium text-sm">
              {{ lead.name }}
            </h3>

            <!-- ADDRESS -->
            <p v-if="lead.address" class="mt-1 truncate text-sm text-neutral-500 dark:text-neutral-400">
              {{ lead.address }}
            </p>

          </div>

          <!-- RIGHT -->
          <div class="flex items-center gap-4 shrink-0">

            <!-- RATING -->
            <span v-if="lead.rating !== null" class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <LucideStar :size="16" />

              {{ lead.rating }}

              <span class="text-gray-400 dark:text-gray-500">
                ({{ lead.reviewCount }})
              </span>
            </span>

            <!-- WEBSITE -->
            <a v-if="lead.website" :href="lead.website" target="_blank" class="text-sm text-neutral-900 dark:text-neutral-200 hover:underline">
              Web
            </a>

            <span v-else class="text-sm text-neutral-400 dark:text-neutral-500">
              Bez webu
            </span>

            <!-- STATUS -->
            <div class="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200">
              Čeká na analýzu
            </div>

          </div>

        </div>

      </div>

    </UiBaseCard>
  </div>
</template>

<script lang="ts" setup>
const searchResults = useSearchResultsStore()

const leads = computed(() => searchResults.leads)
</script>

<style scoped>
</style>