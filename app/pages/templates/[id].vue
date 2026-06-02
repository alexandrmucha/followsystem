<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
      <div>
        <NuxtLink to="/templates" class="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:underline mb-3">
          <LucideArrowLeft :size="14" />
          {{ $t('templates.back') }}
        </NuxtLink>

        <h1 class="text-2xl sm:text-3xl font-semibold">
          {{ $t('templates.edit_title') }}
        </h1>
      </div>

      <UiBaseButton variant="primary" size="sm" class="w-fit shrink-0" :disabled="saving" @click="save">
        <UiSpinner v-if="saving" />
        {{ $t('common.save') }}
      </UiBaseButton>
    </div>

    <div class="space-y-4">
      <UiBaseCard>
        <UiBaseInput
          v-model="name"
          :label="$t('templates.name_label')"
        />
      </UiBaseCard>

      <UiBaseCard>
        <UiBaseTextarea
          v-model="body"
          :label="$t('templates.body_label')"
          :rows="16"
        />
        <p class="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
          {{ $t('templates.placeholders_hint') }}
        </p>
      </UiBaseCard>
    </div>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()
const route = useRoute()
const alertFlow = useAlertFlow()

useHead({
  title: t('templates.edit_title')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const id = route.params.id as string

const { data: template } = await useAsyncData(`template-${id}`, () =>
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
    alertFlow.success(t('templates.saved'))
  } catch {
    alertFlow.error(t('templates.save_error'))
  } finally {
    saving.value = false
  }
}
</script>