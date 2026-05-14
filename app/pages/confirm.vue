<template>
  <div>{{ $t('auth.common.waiting_for_login') }}</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
      return navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

