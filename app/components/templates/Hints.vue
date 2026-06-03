<template>
  <UiBaseCard>
    <p :class="[hintLabelClass, 'mb-2']">
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

    <p :class="[hintLabelClass, 'mb-2']">
      {{ $t('templates.edit.conditions_hint') }}
    </p>

    <pre :class="[codeBlockClass, 'mb-4']">{if lcp == 1}
Your website loads in 1 second.
{else}
Your website loads in {lcp} seconds.
{endif}</pre>

    <p :class="[hintLabelClass, 'mb-2']">
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
import { codeBlockClass, codeTagClass, hintLabelClass } from '~/utils/ui'

const variables = [
  'company_name', 'website', 'mobile_performance_score', 'desktop_performance_score',
  'seo_score', 'accessibility_score', 'best_practices_score', 'lcp', 'page_size'
]

const operators = ['>', '<', '>=', '<=', '==']
</script>