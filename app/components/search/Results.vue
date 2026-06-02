<template>
  <div v-if="searchResults.searched && !searchResults.sortedLeads.length" class="mt-8">
    <UiBaseCard>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 text-center">
        {{ t('search.results.empty') }}
      </p>
    </UiBaseCard>
  </div>

  <div class="mt-8 space-y-6" v-if="searchResults.sortedLeads.length">

    <SearchProgress />

    <SearchSort v-if="searchResults.sessionStatus === 'done' || searchResults.sessionStatus === 'cancelled'" />

    <UiBaseCard class="overflow-hidden">
      <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <SearchLeadItem
          v-for="lead in searchResults.sortedLeads"
          :key="lead.id"
          :lead="lead"
          @generate-email="openEmailModal"
        />
      </div>

      <div class="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
        <p class="text-[10px] tracking-wide text-neutral-400 dark:text-neutral-500 uppercase font-medium select-none">
          Powered by Google
        </p>
      </div>
    </UiBaseCard>

  </div>

  <SearchEmailModal
    v-if="selectedLead"
    :lead="selectedLead"
    @close="selectedLead = null"
  />
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

const { t } = useI18n()
const searchResults = useSearchResultsStore()

const selectedLead = ref<BusinessLeadDTO | null>(null)

const openEmailModal = (lead: BusinessLeadDTO) => {
  selectedLead.value = lead
}
</script>