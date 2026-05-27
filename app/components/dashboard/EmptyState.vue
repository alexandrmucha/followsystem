<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
      {{ $t('dashboard.empty_state.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('dashboard.empty_state.description') }}
    </p>

    <UiBaseCard class="mt-8 p-6">
      <div class="flex flex-col sm:flex-row gap-3">
        <UiBaseInput
          v-model="industry"
          :placeholder="$t('dashboard.empty_state.industry_placeholder')"
          class="flex-1"
        />
        <UiBaseInput
          v-model="city"
          :placeholder="$t('dashboard.empty_state.city_placeholder')"
          class="flex-1"
        />
        <UiBaseButton @click="search">
          {{ $t('dashboard.empty_state.search_button') }}
        </UiBaseButton>
      </div>
    </UiBaseCard>

  </div>
</template>

<script lang="ts" setup>
const industry = ref('')
const city = ref('')

function search() {
  // TODO: implement search
}
</script>