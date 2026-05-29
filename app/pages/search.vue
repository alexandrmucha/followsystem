<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold mb-2">
      {{ $t('search.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('search.description') }}
    </p>

    <SearchForm />
    <SearchResults/>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('nav.search')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

</script>