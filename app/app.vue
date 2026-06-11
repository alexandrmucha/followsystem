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
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
  meta: [
    { name: 'theme-color', content: '#615fff' },
  ],
})
</script>