<template>
  <UiBaseCard>
    <div class="flex flex-col sm:flex-row gap-3">

      <UiBaseInput
        v-model="industry"
        :label="$t('search.form.industry_label')"
        :placeholder="$t('search.form.industry_placeholder')"
        class="flex-1"
      />

      <UiBaseInput
        v-model="location"
        :label="$t('search.form.location_label')"
        :placeholder="$t('search.form.location_placeholder')"
        class="flex-1"
      />
    </div>

    <!-- Strategy cards -->
    <div class="mt-5">
      <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
        {{ $t('search.form.focus_label') }}
      </p>

      <SearchFocusCards v-model="focus" />
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

    <UiBaseButton class="mt-5" @click="search">
      {{ $t('search.form.button') }}
    </UiBaseButton>

    <p v-if="showHelper" class="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
      {{ $t('search.form.helper_text') }}
    </p>
  </UiBaseCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  showHelper: {
    type: Boolean,
    default: false
  }
})

const industry = ref('')
const location = ref('')
const focus = ref('weak_websites')

// advanced
const showAdvanced = ref(false)
const limit = ref(25)

async function search() {
  console.log({
    industry: industry.value,
    location: location.value,
    focus: focus.value,
    limit: limit.value
  })
}
</script>