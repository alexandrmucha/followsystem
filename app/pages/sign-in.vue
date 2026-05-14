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
      {{ $t('auth.sign_in.title') }}
    </h1>

    <!-- Form -->
    <form @submit.prevent="signIn" class="space-y-4">

      <!-- Email -->
      <div>
        <BaseInput v-model="email" :label="$t('auth.common.email')" type="email" placeholder="you@example.com" :error="!!emailError" />

        <p v-if="!!emailError" class="text-sm text-red-500 dark:text-red-400 mt-2">
          {{ emailError }}
        </p>
      </div>

      <!-- Button -->
      <BaseButton type="submit" :disabled="loading">
        {{ $t('auth.sign_in.button') }}
      </BaseButton>

      <!-- System error -->
      <p v-if="errorMsg" class="text-red-500 dark:text-red-400 text-sm text-center">
        {{ errorMsg }}
      </p>

    </form>
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

const email = ref('')

const supabase = useSupabaseClient()

const loading = ref(false)
const errorMsg = ref('')
const emailError = ref('')
const showEmailAlert = ref(false)

const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

watch(email, () => {
  if (emailError.value) {
    emailError.value = ''
  }
})

const signIn = async () => {
  errorMsg.value = ''
  emailError.value = ''

  // VALIDATION
  if (!email.value) {
    emailError.value = t('auth.errors.email_required')
    return
  }

  if (!isEmailValid.value)  {
    emailError.value = t('auth.errors.email_invalid')
    return
  }

  loading.value = true

  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
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
}
</script>