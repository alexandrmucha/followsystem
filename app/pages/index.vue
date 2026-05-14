<template>
  <div class="flex space-x-4">
    <NuxtLink to="/login">{{ $t('auth.login.title') }}</NuxtLink>
    <NuxtLink to="/register">{{ $t('auth.register.title') }}</NuxtLink>
  </div>
</template>
