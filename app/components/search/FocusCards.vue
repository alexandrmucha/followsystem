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
        Improve weak websites
      </template>

      <template #description>
        Slabé nebo zastaralé weby s nízkou kvalitou UX
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
        Growth opportunities
      </template>

      <template #description>
        Firmy s nízkou viditelností online a slabou Google přítomností
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
        High-value businesses
      </template>

      <template #description>
        Větší a zavedené firmy s vyšším budgetem a dlouhodobým potenciálem
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