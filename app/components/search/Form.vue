<template>
  <UiBaseCard>
    <form @submit.prevent="search">

      <div class="flex flex-col sm:flex-row gap-3">

        <UiFormField class="flex-1">
          <UiBaseInput
            v-model="searchDraft.industry"
            :disabled="loading || isAnalyzing"
            :error="!!industryError"
            :label="$t('search.form.industry_label')"
            :placeholder="$t('search.form.industry_placeholder')"
          />

          <p v-if="industryError" :class="fieldErrorClass">
            {{ industryError }}
          </p>
        </UiFormField>

        <UiFormField class="flex-1">
          <UiBaseInput
            v-model="searchDraft.location"
            :disabled="loading || isAnalyzing"
            :error="!!locationError"
            :label="$t('search.form.location_label')"
            :placeholder="$t('search.form.location_placeholder')"
          />

          <p v-if="locationError" :class="fieldErrorClass">
            {{ locationError }}
          </p>
        </UiFormField>

      </div>

      <!-- BUTTON -->
      <div class="mt-5">
        <UiBaseButton
          type="submit"
          class="flex items-center gap-2"
          :disabled="loading || isAnalyzing"
        >
          <UiSpinner v-if="loading || isAnalyzing" />
          <span>
            {{ $t('search.form.button') }}
          </span>
        </UiBaseButton>
      </div>

    </form>
  </UiBaseCard>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

const { t } = useI18n()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()

const searchDraft = useSearchDraftStore()
const searchResults = useSearchResultsStore()

// errors
const industryError = ref('')
const locationError = ref('')

// loading (API request)
const loading = ref(false)

// derived state (analysis running)
const isAnalyzing = computed(() => searchResults.analyzing)

const validate = () => {
  industryError.value = ''
  locationError.value = ''

  let isValid = true

  if (!searchDraft.industry.trim()) {
    industryError.value = t('search.form.errors.industry_required')
    isValid = false
  }

  if (!searchDraft.location.trim()) {
    locationError.value = t('search.form.errors.location_required')
    isValid = false
  }

  return isValid
}

// clear errors on typing
watch(() => searchDraft.industry, () => {
  if (industryError.value) industryError.value = ''
})

watch(() => searchDraft.location, () => {
  if (locationError.value) locationError.value = ''
})

const search = async () => {
  if (!validate()) return

  searchResults.clear()

  loading.value = true
  alertFlow.clear()

  try {
    const res = await $api<{
      sessionId: string
      leads: BusinessLeadDTO[]
    }>('/search', {
      method: 'POST',
      body: {
        industry: searchDraft.industry,
        location: searchDraft.location,
      },
    })

    searchResults.setSession(res.sessionId)
    searchResults.setLeads(res.leads)

  } catch (err) {
    console.error(err)
    alertFlow.error(t('search.errors.failed'))

  } finally {
    loading.value = false
  }
}
</script>