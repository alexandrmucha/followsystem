<template>
  <section class="relative py-24 sm:py-36 px-6 overflow-hidden">
    <LandingHeroBackground />

    <div class="max-w-4xl mx-auto text-center relative">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
        {{ $t('landing.hero.headline_1') }}<br/>
        <span class="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">{{ $t('landing.hero.headline_2') }}</span>
      </h1>

      <p class="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        {{ $t('landing.hero.subheadline') }}
      </p>

      <div class="max-w-2xl mx-auto">
        <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 shadow-xl shadow-neutral-950/5 dark:shadow-lg dark:shadow-white/3">
          <div class="flex flex-col sm:flex-row gap-2">
            <input
              v-model.trim="industry"
              type="text"
              :placeholder="$t('search.form.industry_placeholder')"
              class="flex-1 px-4 py-2.5 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition-colors"
              @keydown.enter="handleSearch"
            />
            <input
              v-model.trim="location"
              type="text"
              :placeholder="$t('search.form.location_placeholder')"
              class="flex-1 px-4 py-2.5 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition-colors"
              @keydown.enter="handleSearch"
            />
            <button
              class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              @click="handleSearch"
            >
              {{ $t('search.form.button') }}
              <LucideArrowRight :size="16" />
            </button>
          </div>
        </div>
        <p v-if="formError" :class="[fieldErrorClass, 'mt-3']">{{ formError }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { fieldErrorClass } from '~/utils/ui'

const { t } = useI18n()
const authStore = useAuthStore()
const searchDraft = useSearchDraftStore()

const industry = ref('')
const location = ref('')
const formError = ref('')

const PREFILL_KEY = 'fulply_search_prefill'

async function handleSearch() {
  formError.value = ''
  if (!industry.value) {
    formError.value = t('search.form.errors.industry_required')
    return
  }
  if (!location.value) {
    formError.value = t('search.form.errors.location_required')
    return
  }

  if (authStore.loggedIn) {
    searchDraft.industry = industry.value
    searchDraft.location = location.value
    await navigateTo('/search')
  } else {
    sessionStorage.setItem(PREFILL_KEY, JSON.stringify({ industry: industry.value, location: location.value }))
    await navigateTo('/sign-in')
  }
}
</script>
