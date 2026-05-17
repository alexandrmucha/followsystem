<template>
  <AuthCard>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.sign_in.title') }}
    </h1>

    <!-- Google login -->
    <div class="space-y-4">

      <BaseButton type="button" @click="signInWithGoogle">
        <span>
          {{ $t('auth.sign_in.button') }}
        </span>
      </BaseButton>

    </div>
  </AuthCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('auth.sign_in.title')
})

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const signInWithGoogle = () => {
  window.location.href = 'http://localhost:3001/auth/google'
}
</script>