<template>
  <!-- Success alert -->
  <BaseAlert
    v-if="showEmailAlert"
    type="success"
    :title="$t('auth.confirm_email.title')"
    :message="$t('auth.confirm_email.message')"
    :hint="$t('auth.confirm_email.spam_hint')"
  >
    <template #icon>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
    </template>
  </BaseAlert>

  <AuthCard v-else>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.register.title') }}
    </h1>

    <!-- Form -->
    <form @submit.prevent="register" class="space-y-4">

      <!-- Email -->
      <div>
        <BaseInput v-model="email" :label="$t('auth.common.email')" type="email" placeholder="you@example.com" :error="emailError" />

        <p v-if="emailDirty && !isEmailValid" class="text-sm text-red-500 dark:text-red-400 mt-2">
          {{ $t('auth.errors.email_invalid') }}
        </p>
      </div>

      <!-- Password -->
      <PasswordValidationInput v-model="password" :label="$t('auth.common.password')" @validity="isPasswordValid = $event" />

      <!-- Confirm password -->
      <div>
        <BaseInput v-model="confirmPassword" :label="$t('auth.common.confirm_password')" type="password" placeholder="••••••••" :error="confirmPasswordError" />

        <p v-if="confirmPasswordError" class="text-sm text-red-500 dark:text-red-400 mt-2">
          {{ $t('auth.errors.passwords_not_match') }}
        </p>
      </div>

      <!-- Button -->
      <BaseButton type="submit" :disabled="loading">
        {{ $t('auth.register.button') }}
      </BaseButton>

      <!-- Error message -->
      <p v-if="errorMsg" class="text-red-500 dark:text-red-400 text-sm text-center">
        {{ errorMsg }}
      </p>

      <!-- Auth switch link -->
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>{{ $t('auth.register.already_have_account') }}</span>

        <NuxtLink to="/login" class="text-neutral-900 dark:text-neutral-100 font-medium hover:underline">
          {{ $t('auth.login.button') }}
        </NuxtLink>
      </p>

    </form>
  </AuthCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t('auth.register.title')
})

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const isPasswordValid = ref(false)

const supabase = useSupabaseClient()

const loading = ref(false)
const errorMsg = ref('')
const showEmailAlert = ref(false)

/* =========================
   UI STATE
========================= */

const passwordDirty = computed(() =>
  password.value.length > 0
)

const confirmPasswordDirty = computed(() =>
  confirmPassword.value.length > 0
)

const confirmPasswordError = computed(() =>
  confirmPasswordDirty.value &&
  passwordDirty.value &&
  !passwordsMatch.value
)

const emailDirty = computed(() =>
  email.value.length > 0
)

const emailError = computed(() =>
  emailDirty.value && !isEmailValid.value
)

/* =========================
   PASSWORD VALIDATION
========================= */

const passwordsMatch = computed(() =>
  confirmPassword.value === password.value
)

const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

/* =========================
   REGISTER
========================= */

const register = async () => {
  errorMsg.value = ''

  // REQUIRED VALIDATION
  if (!email.value) {
    errorMsg.value = t('auth.errors.email_required')
    return
  }

  if (!password.value) {
    errorMsg.value = t('auth.errors.password_required')
    return
  }

  if (!confirmPassword.value) {
    errorMsg.value = t('auth.errors.confirm_password_required')
    return
  }

  if (!isEmailValid.value) return
  if (!isPasswordValid.value) return
  if (!passwordsMatch.value) return

  loading.value = true

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })

  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  showEmailAlert.value = true

  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}
</script>

<style>
</style>