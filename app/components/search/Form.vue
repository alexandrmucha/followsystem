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

// default strategy
const focus = ref('weak_websites')

async function search() {
  console.log({
    industry: industry.value,
    location: location.value,
    focus: focus.value
  })
}
</script>