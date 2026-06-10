<template>
  <section class="py-20 px-6">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-3">{{ $t('landing.faq.title') }}</h2>
      </div>

      <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <div v-for="item in items" :key="item.q" class="py-5">
          <button
            class="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            @click="toggle(item.q)"
          >
            <span class="font-medium text-sm">{{ $t(item.q) }}</span>
            <LucideChevronDown
              :size="16"
              class="shrink-0 text-neutral-400 dark:text-neutral-500 transition-transform duration-200"
              :class="open === item.q ? 'rotate-180' : ''"
            />
          </button>
          <div v-if="open === item.q" class="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ $t(item.a) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const open = ref<string | null>(null)

function toggle(key: string) {
  open.value = open.value === key ? null : key
}

const items = [
  { q: 'landing.faq.q1.q', a: 'landing.faq.q1.a' },
{ q: 'landing.faq.q3.q', a: 'landing.faq.q3.a' },
  { q: 'landing.faq.q4.q', a: 'landing.faq.q4.a' },
  { q: 'landing.faq.q5.q', a: 'landing.faq.q5.a' },
  { q: 'landing.faq.q6.q', a: 'landing.faq.q6.a' },
]
</script>
