<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

    <SearchFocusCard
      :active="modelValue === 'weak_websites'"
      :disabled="disabled"
      @select="select('weak_websites')"
    >
      <template #icon>
        <LucideGlobe />
      </template>

      <template #title>
        {{ $t('search.focus.weak_websites.title') }}
      </template>

      <template #description>
        {{ $t('search.focus.weak_websites.description') }}
      </template>
    </SearchFocusCard>

    <SearchFocusCard
      :active="modelValue === 'growth_opportunities'"
      :disabled="disabled"
      @select="select('growth_opportunities')"
    >
      <template #icon>
        <LucideTrendingUp />
      </template>

      <template #title>
        {{ $t('search.focus.growth_opportunities.title') }}
      </template>

      <template #description>
        {{ $t('search.focus.growth_opportunities.description') }}
      </template>
    </SearchFocusCard>

    <SearchFocusCard
      :active="modelValue === 'high_value'"
      :disabled="disabled"
      @select="select('high_value')"
    >
      <template #icon>
        <LucideBriefcase />
      </template>

      <template #title>
        {{ $t('search.focus.high_value.title') }}
      </template>

      <template #description>
        {{ $t('search.focus.high_value.description') }}
      </template>
    </SearchFocusCard>

  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

/* =========================
   CENTRAL CLICK LOGIC
========================= */
const select = (value: string) => {
  if (props.disabled) return
  emit('update:modelValue', value)
}
</script>