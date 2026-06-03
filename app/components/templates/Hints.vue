<template>
  <UiBaseCard>
    <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
      {{ $t('templates.edit.placeholders_hint') }}
    </p>

    <div class="flex flex-wrap gap-1.5 mb-4">
      <span
        v-for="variable in variables"
        :key="variable"
        :class="codeTagClass"
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
        :class="codeTagClass"
      >
        {{ op }}
      </span>
    </div>
  </UiBaseCard>
</template>

<script lang="ts" setup>
import { codeTagClass } from '~/utils/ui';

const variables = [
  'company_name', 'website', 'mobile_performance_score', 'desktop_performance_score',
  'seo_score', 'accessibility_score', 'best_practices_score', 'lcp', 'page_size'
]

const operators = ['>', '<', '>=', '<=', '==']
</script>