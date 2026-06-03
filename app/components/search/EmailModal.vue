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

      <!-- Recipient -->
      <UiFormField>
        <UiBaseInput
          v-model="recipient"
          :label="t('search.email.recipient_label')"
          placeholder="info@example.com"
        />

        <p v-if="lead?.website" class="text-xs text-neutral-400 dark:text-neutral-500">
          {{ t('search.email.recipient_hint_before') }}
          <a :href="lead.website" target="_blank" class="underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
            {{ t('search.email.recipient_hint_link') }}
          </a>
  
        </p>
      </UiFormField>

      <!-- Subject -->
      <UiFormField>
        <UiBaseInput
          v-model="subject"
          :label="t('search.email.subject_label')"
        />
      </UiFormField>

      <!-- Body -->
      <UiFormField>
        <UiBaseTextarea
          v-model="body"
          :label="t('search.email.body_label')"
          :rows="12"
        />
      </UiFormField>

      <!-- Actions -->
      <div class="flex gap-3 justify-end pt-2">
        <UiBaseButton variant="secondary" size="sm" class="flex items-center gap-2" @click="copy">
          <LucideCopy :size="14" />
          {{ copied ? t('search.email.copied') : t('search.email.copy') }}
        </UiBaseButton>

        <a :href="mailtoLink" target="_blank">
          <UiBaseButton variant="magic" size="sm" class="flex items-center gap-2">
            <LucideMail :size="14" />
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

const recipient = ref('')
const subject = ref('')
const body = ref('')
const copied = ref(false)

const mailtoLink = computed(() => {
  return `mailto:${recipient.value}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`
})

const copy = async () => {
  await navigator.clipboard.writeText(body.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

defineOptions({
  inheritAttrs: false
})

watch(() => props.lead, (lead) => {
  if (!lead) return
  recipient.value = ''
  subject.value = `Váš web ${lead.name} – návrh na zlepšení`
  body.value = generateEmail(lead)
}, { immediate: true })

function generateEmail(lead: BusinessLeadDTO): string {
  const lines: string[] = []

  lines.push('Dobrý den,')
  lines.push('')
  lines.push(`při hledání nových projektů jsem navštívil web Vaší firmy ${lead.name} a dovolil jsem si ho otestovat.`)
  lines.push('')

  const issues: string[] = []

  if (lead.mobileScore != null && lead.mobileScore < 50) {
    issues.push(`Web špatně funguje na mobilech – většina zákazníků dnes prochází internet přes telefon`)
  }

  if (lead.seoScore != null && lead.seoScore < 50) {
    issues.push(`Web se špatně zobrazuje ve vyhledávačích – zákazníci Vás jednoduše nenajdou`)
  }

  if (lead.largestContentfulPaint != null && lead.largestContentfulPaint > 4) {
    issues.push(`Web se načítá ${lead.largestContentfulPaint} sekund – většina návštěvníků odejde po 3 sekundách`)
  }

  if (lead.totalByteWeight != null && lead.totalByteWeight > 3) {
    issues.push(`Web má ${lead.totalByteWeight} MB – na mobilu s horším signálem se nenačte`)
  }

  if (lead.hasSsl === false) {
    issues.push(`Prohlížeč označuje web jako nebezpečný – zákazníci jsou varováni a odcházejí`)
  }

  if (issues.length === 0) {
    lines.push(`Web Vaší firmy vypadá technicky v pořádku. Rád bych se s Vámi přesto pobavil o možnostech jeho dalšího rozvoje a zlepšení.`)
    lines.push('')
    lines.push(`Dávalo by Vám to smysl?`)
  } else if (issues.length === 1) {
    lines.push(`Provedl jsem analýzu pomocí nástroje přímo od Googlu a zjistil jsem problém, který může odrazovat návštěvníky:`)
    lines.push('')
    lines.push(`- ${issues[0]}`)
    lines.push('')
    lines.push(`Rád bych Vám ukázal, jak tento problém opravit a zlepšit výkonnost webu. Dávalo by Vám to smysl?`)
  } else {
    lines.push(`Provedl jsem analýzu pomocí nástroje přímo od Googlu a zjistil jsem několik problémů, které mohou odrazovat návštěvníky:`)
    lines.push('')
    issues.forEach(issue => lines.push(`- ${issue}`))
    lines.push('')
    lines.push(`Rád bych Vám ukázal, jak tyto problémy opravit a zlepšit výkonnost webu. Dávalo by Vám to smysl?`)
  }

  lines.push('')
  lines.push(`S pozdravem`)

  return lines.join('\n')
}
</script>