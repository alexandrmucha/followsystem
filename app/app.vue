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
  meta: [
    { name: 'theme-color', content: '#615fff' },
  ],
})
</script>