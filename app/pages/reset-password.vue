<template>
  <!-- Success alert -->
  <BaseAlert
    v-if="showSuccessAlert"
    type="success"
    :title="$t('auth.reset_password.success.title')"
    :message="$t('auth.reset_password.success.message')"
    :hint="$t('auth.reset_password.success.spam_hint')"
  >
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
    </template>
  </BaseAlert>

  <AuthCard v-else>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.reset_password.title') }}
    </h1>

    <!-- Description -->
    <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
      {{ $t('auth.reset_password.description') }}
    </p>

    <!-- Form -->
    <form @submit.prevent="resetPassword">

      <!-- Email -->
      <div class="space-y-6">
        <BaseInput v-model="email" :label="$t('auth.common.email')" type="email" placeholder="you@example.com" />

        <!-- Button -->
        <BaseButton type="submit" :disabled="loading">
          {{ $t('auth.reset_password.button') }}
        </BaseButton>
      </div>

      <!-- Error message -->
      <p v-if="errorMsg" class="text-red-500 dark:text-red-400 text-sm text-center mt-4">
        {{ errorMsg }}
      </p>
    </form>

  </AuthCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('auth.reset_password.title')
})

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const email = ref('')

const loading = ref(false)
const errorMsg = ref('')
const showSuccessAlert = ref(false)

const supabase = useSupabaseClient()

const resetPassword = async () => {
  errorMsg.value = ''
  loading.value = true

  if (!email.value) {
    errorMsg.value = t('auth.errors.email_required')
    loading.value = false
    return
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `http://localhost:3000/update-password`
  })

  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  showSuccessAlert.value = true
}
</script>

<style>
</style>