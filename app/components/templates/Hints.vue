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
      {{ $t('templates.edit.boolean_hint') }}
    </p>

    <div class="flex flex-wrap gap-1.5 mb-4">
      <span
        v-for="variable in booleanVariables"
        :key="variable"
        :class="codeTagClass"
      >
        {{ variable }}
      </span>
    </div>

    <p :class="[hintLabelClass, 'mb-2']">
      {{ $t('templates.edit.conditions_hint') }}
    </p>

    <pre :class="[codeBlockClass, 'mb-4']">{if mobile_performance_score &lt; 30}
Very slow website.
{elseif mobile_performance_score &lt; 60}
Could be faster.
{else}
Fast website.
{endif}</pre>

    <p :class="[hintLabelClass, 'mb-2']">
      {{ $t('templates.edit.nesting_hint') }}
    </p>

    <pre :class="[codeBlockClass, 'mb-4']">{if has_website == 1}
  {if has_ssl == 0}
  Missing SSL.
  {elseif is_responsive == 0}
  Not responsive.
  {endif}
{else}
No website found.
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
  'company_name', 'website', 'clean_website',
  'rating', 'review_count',
  'mobile_performance_score', 'desktop_performance_score',
  'seo_score', 'accessibility_score', 'best_practices_score',
  'lcp', 'lcp_times', 'page_size',
  'ai_design_score', 'ai_copywriting_score',
]

const booleanVariables = ['has_website', 'has_ssl', 'is_responsive', 'ai_missing_cta_mobile', 'ai_missing_cta_desktop', 'ai_has_own_website']

const operators = ['>', '<', '>=', '<=', '==', '!=', 'and', 'or']
</script>