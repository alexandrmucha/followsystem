<template>
  <div>
    <NuxtRouteAnnouncer />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Fulply` : 'Fulply'
  },
})
</script>