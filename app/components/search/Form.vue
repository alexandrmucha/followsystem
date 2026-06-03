<template>
  <UiBaseCard>
    <form @submit.prevent="search">

      <div class="flex flex-col sm:flex-row gap-3">

        <UiFormField class="flex-1">
          <UiBaseInput
            v-model="searchDraft.location"
            :disabled="isDisabled"
            :error="!!locationError"
            :label="$t('search.form.location_label')"
            :placeholder="$t('search.form.location_placeholder')"
          />

          <p v-if="locationError" :class="fieldErrorClass">
            {{ locationError }}
          </p>
        </UiFormField>

        <UiFormField class="flex-1">
          <UiBaseInput
            v-model="searchDraft.industry"
            :disabled="isDisabled"
            :label="$t('search.form.industry_label')"
            :placeholder="$t('search.form.industry_placeholder')"
          />
        </UiFormField>

      </div>

      <!-- BUTTON -->
      <div class="mt-5 flex items-center gap-3">
        <UiBaseButton
          type="submit"
          class="flex items-center gap-2"
          :disabled="isDisabled"
        >
          <UiSpinner v-if="isDisabled && searchResults.sessionStatus !== 'cancelling'" />
          <span>{{ $t('search.form.button') }}</span>
        </UiBaseButton>

        <UiBaseButton
          v-if="searchResults.sessionStatus === 'analyzing' || searchResults.sessionStatus === 'cancelling'"
          type="button"
          variant="secondary"
          class="flex items-center gap-2"
          :disabled="searchResults.sessionStatus === 'cancelling'"
          @click="stop"
        >
          <UiSpinner v-if="searchResults.sessionStatus === 'cancelling'" />
          <span>{{ $t('search.form.stop_button') }}</span>
        </UiBaseButton>

        <UiBaseButton
          v-if="searchResults.sessionStatus === 'cancelled'"
          type="button"
          variant="secondary"
          @click="resume"
        >
          {{ $t('search.form.resume_button') }}
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
const locationError = ref('')

// loading (API request)
const loading = ref(false)

const isDisabled = computed(() => loading.value || searchResults.sessionStatus === 'analyzing' || searchResults.sessionStatus === 'cancelling')

const validate = () => {
  locationError.value = ''

  let isValid = true

  if (!searchDraft.location.trim()) {
    locationError.value = t('search.form.errors.location_required')
    isValid = false
  }

  return isValid
}

// clear errors on typing
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
    searchResults.setSessionStatus('analyzing')
    searchResults.setLeads(res.leads)

  } catch (err) {
    console.error(err)
    alertFlow.error(t('search.errors.failed'))

  } finally {
    loading.value = false
  }
}

const stop = async () => {
  alertFlow.clear()
  try {
    await $api(`/search/stop/${searchResults.sessionId}`, { method: 'POST' })
    searchResults.setSessionStatus('cancelling')
  } catch (err) {
    console.error(err)
    alertFlow.error(t('search.errors.stop_failed'))
  }
}

const resume = async () => {
  alertFlow.clear()
  try {
    await $api(`/search/resume/${searchResults.sessionId}`, { method: 'POST' })
    searchResults.setSessionStatus('analyzing')
  } catch (err) {
    console.error(err)
    alertFlow.error(t('search.errors.resume_failed'))
  }
}
</script>