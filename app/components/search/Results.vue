<template>
  <div v-if="searched && !leads.length" class="mt-8">
    <UiBaseCard>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 text-center">
        {{ t('search.results.empty') }}
      </p>
    </UiBaseCard>
  </div>

  <div class="mt-8 space-y-6" v-if="leads.length">

    <SearchProgress />

    <SearchSort v-if="!analyzing" />

    <UiBaseCard class="overflow-hidden">
      <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <SearchLeadItem v-for="lead in leads" :key="lead.id" :lead="lead" />
      </div>

      <div class="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
        <p class="text-[10px] tracking-wide text-neutral-400 dark:text-neutral-500 uppercase font-medium select-none">
          Powered by Google
        </p>
      </div>
    </UiBaseCard>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { searched, leads, analyzing } = useSearchResults()
</script>