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
          :maxlength="50"
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
            :maxlength="100"
          />

          <UiBaseTextarea
            v-model="body"
            :label="$t('templates.edit.body_label')"
            :rows="16"
            :maxlength="5000"
          />
        </div>
      </UiBaseCard>

      <UiBaseCard>
        <UiFormField>
          <UiBaseTextarea
            v-model="customPrompt"
            :label="$t('templates.edit.custom_prompt_label')"
            :placeholder="$t('templates.edit.custom_prompt_placeholder')"
            :rows="4"
            :maxlength="1000"
          />
        </UiFormField>
      </UiBaseCard>
      
      <TemplatesHints />

    </div>

  </div>
</template>

<script lang="ts" setup>
import { fieldErrorClass, systemErrorClass } from '~/utils/ui'

const { t } = useI18n()
const { $api } = useNuxtApp()
const route = useRoute()
const alertFlow = useAlertFlow()

useHead({
  title: t('templates.edit.title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const id = route.params.id as string

const { data: template, error } = await useAsyncData(`template-${id}`, () =>
  $api<{ id: string; name: string; subject: string; body: string; customPrompt: string | null }>(`/templates/${id}`)
)

const name = ref(template.value?.name ?? '')
const subject = ref(template.value?.subject ?? '')
const body = ref(template.value?.body ?? '')
const customPrompt = ref(template.value?.customPrompt ?? '')
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
      body: { name: name.value, subject: subject.value, body: body.value, customPrompt: customPrompt.value || null },
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