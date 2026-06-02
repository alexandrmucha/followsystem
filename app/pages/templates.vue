<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-semibold mb-2">
          {{ $t('templates.title') }}
        </h1>

        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          {{ $t('templates.description') }}
        </p>
      </div>

      <UiBaseButton variant="primary" size="sm" class="flex items-center gap-2 w-fit shrink-0">
        <LucidePlus :size="16" />
        {{ $t('templates.create') }}
      </UiBaseButton>
    </div>

    <div class="mt-8">
      <!-- templates list -->
    </div>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('nav.templates')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})
</script>