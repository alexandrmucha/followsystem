<template>
  <div>
    <!-- Title -->
    <h1 class="text-xl font-semibold">
      {{ t('search.title') }}
    </h1>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('search.title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

</script>