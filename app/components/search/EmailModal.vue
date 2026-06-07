<template>
  <UiBaseModal
    :title="t('search.email.title')"
    :description="lead?.name"
    size="xl"
    :closeOnEsc="true"
    :closeOnOverlay="true"
    @close="$emit('close')"
  >
    <div class="space-y-4">

      <!-- Template selector -->
      <UiFormField>
        <UiBaseSelect v-model="selectedTemplateId" :label="t('search.email.template_label')" :disabled="generatingAi">
          <option v-for="template in templates" :key="template.id" :value="template.id">
            {{ template.name }}
          </option>
        </UiBaseSelect>

        <p class="text-xs text-neutral-400 dark:text-neutral-500">
          {{ t('search.email.template_hint_before') }}
          <NuxtLink to="/templates" class="underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
            {{ t('search.email.template_hint_link') }}
          </NuxtLink>{{ t('search.email.template_hint_after') }}
        </p>
      </UiFormField>

      <!-- Recipient -->
      <UiFormField>
        <UiBaseInput
          v-model="recipient"
          :label="t('search.email.recipient_label')"
          placeholder="info@example.com"
          :disabled="generatingAi"
        />

        <p v-if="lead?.website" class="text-xs text-neutral-400 dark:text-neutral-500">
          {{ lead?.email ? t('search.email.recipient_hint_verify_before') : t('search.email.recipient_hint_before') }}
          <a :href="lead.website" target="_blank" class="underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
            {{ t('search.email.recipient_hint_link') }}
          </a>{{ t('search.email.recipient_hint_after') }}
        </p>
      </UiFormField>

      <!-- Subject -->
      <UiFormField>
        <UiBaseInput
          v-model="subject"
          :label="t('search.email.subject_label')"
          :disabled="generatingAi"
        />
      </UiFormField>

      <!-- Body -->
      <UiFormField>
        <UiBaseTextarea
          v-model="body"
          :label="t('search.email.body_label')"
          :rows="12"
          :disabled="generatingAi"
        />

        <p class="text-xs text-neutral-400 dark:text-neutral-500">
          {{ t('search.email.body_hint') }}
        </p>
      </UiFormField>

      <!-- AI generate -->
      <UiBaseButton variant="magic" size="sm" class="flex items-center gap-2 ml-auto" :disabled="generatingAi" @click="generateWithAi">
        <LucideSparkles :size="16" />
        {{ generatingAi ? t('search.email.generating_ai') : t('search.email.generate_ai') }}
      </UiBaseButton>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
        <UiBaseButton variant="secondary" size="sm" class="flex items-center justify-center gap-2" @click="copy">
          <LucideCopy :size="16" />
          {{ copied ? t('search.email.copied') : t('search.email.copy') }}
        </UiBaseButton>

        <a :href="mailtoLink" target="_blank" class="block sm:inline-block">
          <UiBaseButton variant="primary" size="sm" class="flex items-center justify-center gap-2 w-full">
            <LucideMail :size="16" />
            {{ t('search.email.open') }}
          </UiBaseButton>
        </a>
      </div>

    </div>
  </UiBaseModal>
</template>

<script lang="ts" setup>
import type { BusinessLeadDTO } from '~/types/business-lead.dto'

const props = defineProps<{
  lead: BusinessLeadDTO | null
}>()

defineEmits<{ close: [] }>()

const { t } = useI18n()
const { $api } = useNuxtApp()
const { parseTemplate } = useTemplateParser()

const recipient = ref('')
const subject = ref('')
const body = ref('')
const copied = ref(false)
const selectedTemplateId = ref('')

const { data: templates } = await useAsyncData('templates', () =>
  $api<{ id: string; name: string; isDefault: boolean; subject: string; body: string; customPrompt: string | null }[]>('/templates')
)

const applyTemplate = (templateId: string, lead: BusinessLeadDTO) => {
  const template = templates.value?.find(t => t.id === templateId)
  if (!template) return
  subject.value = parseTemplate(template.subject, lead)
  body.value = parseTemplate(template.body, lead)
}

watch(templates, (templates) => {
  if (templates?.length && !selectedTemplateId.value) {
    const defaultTemplate = templates.find(t => t.isDefault) ?? templates[0]
    if (defaultTemplate) selectedTemplateId.value = defaultTemplate.id
  }
}, { immediate: true })

watch(selectedTemplateId, (id) => {
  if (!id || !props.lead) return
  applyTemplate(id, props.lead)
})

watch(() => props.lead, (lead) => {
  if (!lead) return
  recipient.value = lead.email ?? ''
  if (selectedTemplateId.value) {
    applyTemplate(selectedTemplateId.value, lead)
  }
}, { immediate: true })

const mailtoLink = computed(() => {
  return `mailto:${recipient.value}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`
})

const generatingAi = ref(false)

const generateWithAi = async () => {
  if (!props.lead || generatingAi.value) return
  generatingAi.value = true
  try {
    const selectedTemplate = templates.value?.find(t => t.id === selectedTemplateId.value)
    const result = await $api<{ subject: string; body: string }>('/email/generate', {
      method: 'POST',
      body: { lead: props.lead, subject: subject.value, body: body.value, customPrompt: selectedTemplate?.customPrompt ?? null },
    })
    subject.value = result.subject
    body.value = result.body
  } finally {
    generatingAi.value = false
  }
}

const copy = async () => {
  await navigator.clipboard.writeText(body.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>