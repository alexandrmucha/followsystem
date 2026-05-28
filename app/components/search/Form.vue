<template>
  <UiBaseCard>
    <form @submit.prevent="search">
      <div class="flex flex-col sm:flex-row gap-3">

        <div class="flex-1">
          <UiBaseInput
            v-model="industry"
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
            v-model="location"
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

        <SearchFocusCards v-model="focus" :disabled="loading" />
      </div>

      <!-- Advanced settings -->
      <div class="mt-5">
        <button type="button" class="flex gap-2 items-center text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors cursor-pointer" @click="showAdvanced = !showAdvanced">
          <span>
            <LucideChevronUp v-if="showAdvanced" :size="16" />
            <LucideChevronDown v-else :size="16" />
          </span>
          <span>{{ $t('search.form.advanced_settings') }}</span>
        </button>

        <div v-if="showAdvanced" class="mt-3 space-y-3">

          <UiBaseSelect
            v-model="limit"
            :label="$t('search.form.limit_label')"
            class="max-w-sm"
          >
            <option :value="10">10 {{ $t('common.results') }}</option>
            <option :value="25">25 {{ $t('common.results') }}</option>
            <option :value="50">50 {{ $t('common.results') }}</option>
          </UiBaseSelect>

        </div>
      </div>

      <UiBaseButton type="submit" class="mt-5 flex items-center gap-2" :disabled="loading ">
        <span v-if="loading"><UiSpinner /></span>
        <span>{{ $t('search.form.button') }}</span>
      </UiBaseButton>

      <p v-if="showHelper" class="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
        {{ $t('search.form.helper_text') }}
      </p>
    </form>
  </UiBaseCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  showHelper: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()

const industry = ref('')
const location = ref('')
const focus = ref('weak_websites')

// errors
const industryError = ref('')
const locationError = ref('')

// advanced
const showAdvanced = ref(false)
const limit = ref(25)

const loading = ref(false)

const validate = () => {
  industryError.value = ''
  locationError.value = ''

  let isValid = true

  if (!industry.value.trim()) {
    industryError.value = t('search.form.errors.industry_required')
    isValid = false
  }

  if (!location.value.trim()) {
    locationError.value = t('search.form.errors.location_required')
    isValid = false
  }

  return isValid
}

watch(industry, (val) => {
  if (industryError.value) {
    industryError.value = ''
  }
})

watch(location, (val) => {
  if (locationError.value) {
    locationError.value = ''
  }
})

const search = async () => {
  if (!validate()) return

  loading.value = true

  await new Promise((resolve) => setTimeout(resolve, 3000))

  loading.value = false
}
</script>