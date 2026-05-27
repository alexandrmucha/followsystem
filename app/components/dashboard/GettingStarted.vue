<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
      {{ $t('dashboard.getting_started.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('dashboard.getting_started.description') }}
    </p>

    <SearchForm :show-helper="true" />

  </div>
</template>

<script lang="ts" setup>



</script>