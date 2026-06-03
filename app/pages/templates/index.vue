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

      <UiBaseButton variant="primary" size="sm" class="flex items-center gap-2 w-fit shrink-0" :disabled="creating" @click="createTemplate">
        <LucidePlus :size="16" />
        {{ $t('templates.create') }}
      </UiBaseButton>
    </div>

    <div class="mt-8 space-y-4">
      <p v-if="error" :class="[systemErrorClass, 'text-center py-8']">
        {{ $t('templates.errors.load') }}
      </p>

      <template v-else>
        <UiBaseCard v-for="template in templates" :key="template.id">
          <div class="flex items-center justify-between">
            <p class="font-medium text-sm">{{ template.name }}</p>
            <div class="flex items-center gap-2">
              <UiBaseButton variant="secondary" size="sm" @click="navigateTo(`/templates/${template.id}`)">
                {{ $t('common.edit') }}
              </UiBaseButton>
              <UiBaseButton variant="danger" size="sm" @click="deleteTemplate(template.id)">
                {{ $t('common.delete') }}
              </UiBaseButton>
            </div>
          </div>
        </UiBaseCard>

        <p v-if="templates?.length === 0" class="text-sm text-neutral-500 dark:text-neutral-400 text-center py-8">
          {{ $t('templates.empty') }}
        </p>
      </template>
    </div>

    <UiConfirmModal
      v-if="deleteId"
      :title="$t('templates.delete_confirm_title')"
      :description="$t('templates.delete_confirm_description')"
      :confirm-label="$t('common.delete')"
      @confirm="confirmDelete"
      @cancel="deleteId = null"
    />

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { $api } = useNuxtApp()
const alertFlow = useAlertFlow()

useHead({
  title: t('nav.templates')
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { data: templates, refresh, error } = await useAsyncData('templates', () =>
  $api<{ id: string; name: string }[]>('/templates')
)

const creating = ref(false)
const deleteId = ref<string | null>(null)

const createTemplate = async () => {
  creating.value = true
  alertFlow.clear()

  try {
    const template = await $api<{ id: string }>('/templates', { method: 'POST' })
    await navigateTo(`/templates/${template.id}`)
  } catch {
    alertFlow.error(t('templates.errors.create'))
  } finally {
    creating.value = false
  }
}

const deleteTemplate = (id: string) => {
  deleteId.value = id
}

const confirmDelete = async () => {
  if (!deleteId.value) return
  alertFlow.clear()

  try {
    await $api(`/templates/${deleteId.value}`, { method: 'DELETE' })
    await refresh()
  } catch {
    alertFlow.error(t('templates.errors.delete'))
  } finally {
    deleteId.value = null
  }
}
</script>