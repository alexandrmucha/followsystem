<template>
  <NuxtLink :to="to" class="flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 transition-colors" :class="isActive ? activeClass : baseClass">
    <!-- Icon -->
    <span class="shrink-0">
      <slot name="icon" />
    </span>

    <!-- Label -->
    <span>
      <slot />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string
  exact?: boolean
}>()

const route = useRoute()

/* =========================
   ACTIVE STATE
========================= */

const isActive = computed(() => {
  if (props.exact) {
    return route.path === props.to
  }

  return route.path.startsWith(props.to)
})

/* =========================
   STYLES (light + dark)
========================= */

const baseClass =
  'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800'

const activeClass =
  'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
</script>