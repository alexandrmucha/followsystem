<template>
  <div class="mt-6">
    <UiBaseCard>
      <div class="p-4">

        <!-- RESULTS -->
        <ul class="space-y-4">
          <li
            v-for="lead in leads"
            :key="lead.googlePlaceId"
            class="border-b pb-3 last:border-b-0 last:pb-0"
          >
            <div class="flex flex-col gap-1">

              <!-- NAME + STATUS -->
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-semibold text-base">
                  {{ lead.name }}
                </h3>

                <span
                  v-if="lead.businessStatus"
                  class="text-xs px-2 py-1 rounded bg-gray-100"
                >
                  {{ lead.businessStatus }}
                </span>
              </div>

              <!-- ADDRESS -->
              <p v-if="lead.address" class="text-sm text-gray-600">
                {{ lead.address }}
              </p>

              <!-- META -->
              <div class="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">

                <span v-if="lead.rating !== null">
                  ⭐ {{ lead.rating }} / 5
                </span>

                <span v-if="lead.reviewCount !== null">
                  ({{ lead.reviewCount }} recenzí)
                </span>

                <span v-if="lead.types?.length">
                  {{ lead.types.slice(0, 2).join(', ') }}
                </span>

              </div>

              <!-- CONTACT -->
              <div class="flex gap-3 mt-2 text-xs">
                <a
                  v-if="lead.website"
                  :href="lead.website"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  Web
                </a>

                <span v-else class="text-gray-400">
                  bez webu
                </span>

                <span v-if="lead.phone" class="text-gray-600">
                  {{ lead.phone }}
                </span>
              </div>

            </div>
          </li>
        </ul>

      </div>
    </UiBaseCard>
  </div>
</template>

<script lang="ts" setup>
const searchResults = useSearchResultsStore()

const leads = computed(() => searchResults.leads)
</script>

<style scoped>
</style>