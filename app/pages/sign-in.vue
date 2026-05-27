<template>
  <!-- Success alert -->
  <UiBaseAlert
    v-if="showEmailAlert"
    type="success"
    :title="$t('auth.confirm_email.title')"
    :message="$t('auth.confirm_email.message')"
    :hint="$t('auth.confirm_email.spam_hint')"
  >
    <template #icon>
      <LucideCircleCheckBig :size="24" />
    </template>
  </UiBaseAlert>

  <UiAuthCard v-else>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.sign_in.title') }}
    </h1>

    <!-- Form -->
    <form @submit.prevent="signIn">

      <UiBaseButton type="button" class="w-full flex justify-center items-center space-x-3" variant="secondary" @click="signInWithGoogle">
        <img src="/img/Google__G__logo.svg" class="w-6 h-6" alt="Google Logo">
        <span>
          {{ $t('auth.sign_in.continue_with_google') }}
        </span>
      </UiBaseButton>

      <!-- Divider -->
      <div class="relative flex items-center py-4">
        <div class="grow border-t border-neutral-300 dark:border-neutral-700"></div>

        <span class="mx-4 text-sm text-neutral-500 dark:text-neutral-400 uppercase">
          {{ $t('common.or') }}
        </span>

        <div class="grow border-t border-neutral-300 dark:border-neutral-700"></div>
      </div>

      <!-- Email -->
      <div>
        <UiBaseInput v-model="email" :label="$t('auth.common.email')" type="email" placeholder="you@example.com" :error="!!emailError" />

        <p v-if="!!emailError" class="text-sm text-red-500 dark:text-red-400 mt-2">
          {{ emailError }}
        </p>
      </div>

      <!-- Cloudflare Turnstile -->
      <div class="flex justify-center py-2">
        <NuxtTurnstile v-model="turnstileToken" />
      </div>

      <!-- Button -->
      <UiBaseButton type="submit" class="w-full" :disabled="loading">
        {{ $t('auth.sign_in.button') }}
      </UiBaseButton>

      <!-- System error -->
      <p v-if="errorMsg" class="text-red-600 dark:text-red-500 text-sm text-center">
        {{ errorMsg }}
      </p>

    </form>
  </UiAuthCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const config = useRuntimeConfig()
const { $api } = useNuxtApp();

useHead({
  title: t('auth.sign_in.title')
})

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const email = ref('')
const turnstileToken = ref('')

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

  if (!turnstileToken.value) {
    errorMsg.value = t('common.errors.security_verification_failed')
    loading.value = false
    return
  }

  loading.value = true

  try {
    await $api('/auth/magic-link', {
      method: 'POST',
      body: {
        email: email.value,
        turnstileToken: turnstileToken.value
      },
    })
  } catch (err) {
    errorMsg.value = t('auth.errors.magic_link')
    return
  } finally {
    loading.value = false
  }

  showEmailAlert.value = true
  email.value = ''
  turnstileToken.value = ''
}

const signInWithGoogle = () => {
  window.location.href = `${config.public.apiBaseUrl}/auth/google`
}
</script>
