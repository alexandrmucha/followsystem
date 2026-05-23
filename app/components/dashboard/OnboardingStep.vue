<template>
  <UiBaseCard :active="active">

    <div class="flex items-start gap-3">

      <!-- LEFT ICON -->
      <div class="flex">

        <!-- DONE -->
        <span v-if="done" class="text-emerald-600 dark:text-emerald-400 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
        </span>

        <!-- NOT DONE -->
        <span v-else class="text-sm text-neutral-500 dark:text-neutral-400">
          {{ index }}
        </span>

      </div>

      <!-- CONTENT -->
      <div>
        <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {{ title }}
        </div>

        <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {{ description }}
        </div>
      </div>

    </div>

  </UiBaseCard>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>