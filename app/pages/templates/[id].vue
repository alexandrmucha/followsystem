<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
      <div>
        <NuxtLink to="/templates" class="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:underline mb-3">
          <LucideArrowLeft :size="14" />
          {{ $t('templates.edit.back') }}
        </NuxtLink>

        <h1 class="text-2xl sm:text-3xl font-semibold">
          {{ $t('templates.edit.title') }}
        </h1>
      </div>

      <UiBaseButton variant="primary" size="sm" class="w-fit shrink-0" :disabled="saving || !!error" @click="save">
        <UiSpinner v-if="saving" />
        {{ $t('common.save') }}
      </UiBaseButton>
    </div>

    <p v-if="error" :class="[systemErrorClass, 'text-center py-8']">
      {{ $t('templates.edit.errors.load') }}
    </p>

    <div v-else class="space-y-4">
      <UiBaseCard>
        <UiBaseInput
          v-model="name"
          :label="$t('templates.edit.name_label')"
        />
      </UiBaseCard>

      <UiBaseCard>
        <UiBaseTextarea
          v-model="body"
          :label="$t('templates.edit.body_label')"
          :rows="16"
        />
      </UiBaseCard>

      <UiBaseCard>
        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {{ $t('templates.edit.placeholders_hint') }}
        </p>

        <div class="flex flex-wrap gap-1.5 mb-4">
          <span
            v-for="variable in variables"
            :key="variable"
            class="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-1.5 py-0.5 rounded"
          >
            {{ '{' + variable + '}' }}
          </span>
        </div>

        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {{ $t('templates.edit.conditions_hint') }}
        </p>

        <pre class="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-3 py-2 rounded whitespace-pre-wrap">{if lcp > 4}
Your website loads in {lcp} seconds.
{endif}</pre>
      </UiBaseCard>

    </div>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()
const route = useRoute()
const alertFlow = useAlertFlow()

const variables = [
  'company_name', 'website', 'mobile_performance_score', 'desktop_performance_score',
  'seo_score', 'accessibility_score', 'best_practices_score', 'lcp', 'page_size'
]

useHead({
  title: t('templates.edit.title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const id = route.params.id as string

const { data: template, error } = await useAsyncData(`template-${id}`, () =>
  $api<{ id: string; name: string; body: string }>(`/templates/${id}`)
)

const name = ref(template.value?.name ?? '')
const body = ref(template.value?.body ?? '')
const saving = ref(false)

const save = async () => {
  saving.value = true
  alertFlow.clear()

  try {
    await $api(`/templates/${id}`, {
      method: 'PATCH',
      body: { name: name.value, body: body.value },
    })
    alertFlow.success(t('templates.edit.saved'))
  } catch {
    alertFlow.error(t('templates.edit.errors.save'))
  } finally {
    saving.value = false
  }
}
</script>