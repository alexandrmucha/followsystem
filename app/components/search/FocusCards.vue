<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

    <SearchFocusCard
      :active="modelValue === 'weak_websites'"
      @select="$emit('update:modelValue', 'weak_websites')"
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
      @select="$emit('update:modelValue', 'growth_opportunities')"
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
      @select="$emit('update:modelValue', 'high_value')"
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
defineProps<{
  modelValue: string
}>()

defineEmits(['update:modelValue'])
</script>