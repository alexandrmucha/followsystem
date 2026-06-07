<template>
  <UiBaseCard>
    <form @submit.prevent="search">

      <div class="flex flex-col sm:flex-row gap-3">

        <UiFormField class="flex-1">
          <UiBaseInput
            v-model="searchDraft.industry"
            :disabled="isDisabled"
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
            :disabled="isDisabled"
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

        <p v-if="usage" class="ml-auto text-xs text-neutral-400 dark:text-neutral-500">
          {{ $t('search.form.usage', { used: usage.sessions.used, limit: usage.sessions.limit }) }}
        </p>
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

const { data: usage, refresh: refreshUsage } = await useAsyncData('search-usage', () =>
  $api<{ sessions: { used: number; limit: number; remaining: number } }>('/search/usage')
)

const isDisabled = computed(() => loading.value || searchResults.sessionStatus === 'analyzing' || searchResults.sessionStatus === 'cancelling')

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
      id: string
      leads: BusinessLeadDTO[]
    }>('/search', {
      method: 'POST',
      body: {
        industry: searchDraft.industry,
        location: searchDraft.location,
      },
    })

    searchResults.setSession(res.id)
    searchResults.setSessionStatus('analyzing')
    searchResults.setLeads(res.leads)
    refreshUsage()

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
    await $api(`/search/sessions/${searchResults.sessionId}/stop`, { method: 'POST' })
    searchResults.setSessionStatus('cancelling')
  } catch (err) {
    console.error(err)
    alertFlow.error(t('search.errors.stop_failed'))
  }
}

const resume = async () => {
  alertFlow.clear()
  try {
    await $api(`/search/sessions/${searchResults.sessionId}/resume`, { method: 'POST' })
    searchResults.setSessionStatus('analyzing')
  } catch (err) {
    console.error(err)
    alertFlow.error(t('search.errors.resume_failed'))
  }
}
</script>