<template>
  <UiBaseCard>
    <form @submit.prevent="search">

      <div class="flex flex-col sm:flex-row gap-3">

        <div class="flex-1">
          <UiBaseInput
            v-model="searchDraft.industry"
            :disabled="loading"
            :error="!!industryError"
            :label="$t('search.form.industry_label')"
            :placeholder="$t('search.form.industry_placeholder')"
          />

          <p v-if="industryError" class="text-sm text-red-500 dark:text-red-400 mt-2">
            {{ industryError }}
          </p>
        </div>

        <div class="flex-1">
          <UiBaseInput
            v-model="searchDraft.location"
            :disabled="loading"
            :error="!!locationError"
            :label="$t('search.form.location_label')"
            :placeholder="$t('search.form.location_placeholder')"
          />

          <p v-if="locationError" class="text-sm text-red-500 dark:text-red-400 mt-2">
            {{ locationError }}
          </p>
        </div>

      </div>

      <!-- Strategy cards -->
      <div class="mt-5">
        <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
          {{ $t('search.form.focus_label') }}
        </p>

        <SearchFocusCards
          v-model="searchDraft.focus"
          :disabled="loading"
        />
      </div>

      <!-- Advanced settings -->
      <div class="mt-5">
        <button
          type="button"
          class="flex gap-2 items-center text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors cursor-pointer"
          @click="showAdvanced = !showAdvanced"
        >
          <span>
            <LucideChevronUp v-if="showAdvanced" :size="16" />
            <LucideChevronDown v-else :size="16" />
          </span>
          <span>{{ $t('search.form.advanced_settings') }}</span>
        </button>

        <div v-if="showAdvanced" class="mt-3 space-y-3">
          <UiBaseSelect
            v-model="searchDraft.limit"
            :disabled="loading"
            :label="$t('search.form.limit_label')"
            class="max-w-sm"
          >
            <option :value="10">10 {{ $t('common.results') }}</option>
            <option :value="25">25 {{ $t('common.results') }}</option>
            <option :value="50">50 {{ $t('common.results') }}</option>
          </UiBaseSelect>
        </div>
      </div>

      <!-- BUTTON / LOADING / STOP -->
      <div class="mt-5 flex items-center gap-3">

        <UiBaseButton
          type="submit"
          class="flex items-center gap-2"
          :disabled="loading"
        >
          <UiSpinner v-if="loading" />
          <span>{{ $t('search.form.button') }}</span>
        </UiBaseButton>

        <UiBaseButton
          v-if="loading"
          type="button"
          variant="secondary"
          @click="cancelSearch"
        >
          Zastavit
        </UiBaseButton>

      </div>

      <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
        {{ $t('search.form.helper_text') }}
      </p>

    </form>
  </UiBaseCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const searchDraft = useSearchDraftStore()

// errors
const industryError = ref('')
const locationError = ref('')

// UI
const showAdvanced = ref(false)

// loading + abort
const loading = ref(false)
const controller = ref<AbortController | null>(null)

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

  loading.value = true
  controller.value = new AbortController()

  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, 3000)

      controller.value!.signal.addEventListener('abort', () => {
        clearTimeout(timeout)
        reject(new DOMException('Aborted', 'AbortError'))
      })
    })
  } catch (e: any) {
    if (e?.name !== 'AbortError') {
      console.error(e)
    }
  } finally {
    loading.value = false
    controller.value = null
  }
}

const cancelSearch = () => {
  controller.value?.abort()
  loading.value = false
  controller.value = null
}
</script>