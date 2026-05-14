<template>
  <AuthCard>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.login.title') }}
    </h1>

    <!-- Form -->
    <form @submit.prevent="login" class="space-y-4">

      <!-- Email -->
      <BaseInput v-model="email" :label="$t('auth.common.email')" type="email" placeholder="you@example.com" />

      <!-- Password -->
      <div>
        <BaseInput v-model="password" :label="$t('auth.common.password')" type="password" placeholder="••••••••" />

        <!-- Forgot password link -->
        <div class="text-right mt-1">
          <NuxtLink to="/reset-password" class="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline transition-colors">
            {{ $t('auth.login.forgot_password') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Button -->
      <BaseButton type="submit" :disabled="loading">
        {{ $t('auth.login.button') }}
      </BaseButton>

      <!-- Error message -->
      <p v-if="errorMsg" class="text-red-500 dark:text-red-400 text-sm text-center">
        {{ errorMsg }}
      </p>

      <!-- Auth switch link -->
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>{{ $t('auth.login.no_account') }}</span>

        <NuxtLink to="/register" class="text-neutral-900 dark:text-neutral-100 font-medium hover:underline transition-colors">
          {{ $t('auth.register.button') }}
        </NuxtLink>
      </p>

    </form>
  </AuthCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('auth.login.title')
})

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const email = ref('')
const password = ref('')

const supabase = useSupabaseClient()

const loading = ref(false)
const errorMsg = ref('')

/* =========================
   LOGIN
========================= */

const authLoginErrorMap: Record<string, string> = {
  'Invalid login credentials': 'auth.login.invalid_credentials',
  'Email not confirmed': 'auth.login.email_not_confirmed'
}

const getLoginError = (error: any) => {
  if (!error?.message) return 'auth.errors.generic'

  return authLoginErrorMap[error.message] || 'auth.errors.generic'
}

const login = async () => {
  errorMsg.value = ''

  if (!email.value) {
    errorMsg.value = t('auth.errors.email_required')
    return
  }

  if (!password.value) {
    errorMsg.value = t('auth.errors.password_required')
    return
  }

  loading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMsg.value = t(getLoginError(error))
    return
  }

  await navigateTo('/dashboard')
}
</script>

<style>
</style>