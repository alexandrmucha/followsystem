<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#615fff" />
    
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