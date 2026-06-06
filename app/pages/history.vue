<template>
  <div class="max-w-4xl w-full mx-auto sm:mt-4">

    <h1 class="text-2xl sm:text-3xl font-semibold mb-2">
      {{ $t('history.title') }}
    </h1>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
      {{ $t('history.description') }}
    </p>

    <p v-if="error" :class="[systemErrorClass, 'text-center py-8']">
      {{ $t('history.errors.load') }}
    </p>

    <p v-else-if="!sessions?.length" class="text-sm text-neutral-500 dark:text-neutral-400 text-center py-8">
      {{ $t('history.empty') }}
    </p>

    <div v-else class="space-y-3">
      <UiBaseCard v-for="session in sessions" :key="session.id" class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm truncate">{{ session.industry }} · {{ session.location }}</p>
          <p class="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{{ formatDate(session.createdAt) }}</p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <span class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ session.leadCount }} {{ $t('history.leads') }}
          </span>
          <UiBaseBadge :variant="statusVariant(session.status)">
            {{ $t(`history.status.${session.status}`) }}
          </UiBaseBadge>
          <NuxtLink :to="`/search/${session.id}`">
            <UiBaseButton variant="secondary" size="sm">
              {{ $t('history.open') }}
            </UiBaseButton>
          </NuxtLink>
        </div>

      </UiBaseCard>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { systemErrorClass } from '~/utils/ui'

const { t, locale } = useI18n()
const { $api } = useNuxtApp()

useHead({ title: t('nav.history') })

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

type SessionSummary = {
  id: string
  industry: string
  location: string
  status: string
  createdAt: string
  leadCount: number
}

const { data: sessions, error } = await useAsyncData('search-sessions', () =>
  $api<SessionSummary[]>('/search/sessions')
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(locale.value === 'cs' ? 'cs-CZ' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function statusVariant(status: string): 'emerald' | 'blue' | 'amber' | 'neutral' {
  if (status === 'done') return 'emerald'
  if (status === 'analyzing') return 'blue'
  if (status === 'cancelling') return 'amber'
  return 'neutral'
}

</script>
