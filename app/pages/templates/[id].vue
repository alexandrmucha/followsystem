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

      <UiBaseButton variant="primary" size="sm" class="flex items-center gap-2 w-fit shrink-0" :disabled="saving || !!error" @click="save">
        <LucideCheck v-if="saved" :size="16" />
        {{ saved ? $t('common.saved') : $t('common.save') }}
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
          :error="!!nameError"
        />
        <p v-if="nameError" :class="[fieldErrorClass, 'mt-1']">
          {{ nameError }}
        </p>
      </UiBaseCard>

      <UiBaseCard>
        <div class="space-y-4">
          <UiBaseInput
            v-model="subject"
            :label="$t('templates.edit.subject_label')"
          />

          <UiBaseTextarea
            v-model="body"
            :label="$t('templates.edit.body_label')"
            :rows="16"
          />
        </div>
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

        <pre class="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-3 py-2 rounded whitespace-pre-wrap">{if lcp == 1}
Your website loads in 1 second.
{else}
Your website loads in {lcp} seconds.
{endif}</pre>

        <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 mt-4">
          {{ $t('templates.edit.operators_hint') }}
        </p>

        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="op in operators"
            :key="op"
            class="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-1.5 py-0.5 rounded"
          >
            {{ op }}
          </span>
        </div>
      </UiBaseCard>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { fieldErrorClass, systemErrorClass } from '~/utils/ui'

const { t } = useI18n()
const { $api } = useNuxtApp()
const route = useRoute()
const alertFlow = useAlertFlow()

const variables = [
  'company_name', 'website', 'mobile_performance_score', 'desktop_performance_score',
  'seo_score', 'accessibility_score', 'best_practices_score', 'lcp', 'page_size'
]
const operators = ['>', '<', '>=', '<=', '==']

useHead({
  title: t('templates.edit.title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const id = route.params.id as string

const { data: template, error } = await useAsyncData(`template-${id}`, () =>
  $api<{ id: string; name: string; subject: string; body: string }>(`/templates/${id}`)
)

const name = ref(template.value?.name ?? '')
const subject = ref(template.value?.subject ?? '')
const body = ref(template.value?.body ?? '')
const saving = ref(false)
const saved = ref(false)
const nameError = ref('')

watch(name, () => {
  if (nameError.value) nameError.value = ''
})

const save = async () => {
  nameError.value = ''
  saving.value = true
  alertFlow.clear()

  try {
    await $api(`/templates/${id}`, {
      method: 'PATCH',
      body: { name: name.value, subject: subject.value, body: body.value },
    })
    saved.value = true
    setTimeout(() => saved.value = false, 2000)
  } catch (err: any) {
    if (err?.data?.message === 'name_taken') {
      nameError.value = t('templates.edit.errors.name_taken')
    } else {
      alertFlow.error(t('templates.edit.errors.save'))
    }
  } finally {
    saving.value = false
  }
}
</script>