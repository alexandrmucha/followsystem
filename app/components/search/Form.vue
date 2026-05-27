<template>
  <UiBaseCard>
    <div class="flex flex-col sm:flex-row gap-3">

      <UiBaseInput
        v-model="industry"
        :placeholder="$t('search.form.industry_placeholder')"
        class="flex-1"
      />

      <UiBaseInput
        v-model="city"
        :placeholder="$t('search.form.city_placeholder')"
        class="flex-1"
      />

      <UiBaseButton @click="search">
        {{ $t('search.form.button') }}
      </UiBaseButton>

    </div>

    <!-- AI helper (optional) -->
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
const city = ref('')

async function search() {
  // TODO: trigger analysis flow
}
</script>

<style>
</style>