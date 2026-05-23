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
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
    </template>
  </UiBaseAlert>

  <UiAuthCard v-else>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.sign_in.title') }}
    </h1>

    <!-- Form -->
    <form @submit.prevent="signIn" class="space-y-4">

      <!-- Email -->
      <div>
        <UiBaseInput v-model="email" :label="$t('auth.common.email')" type="email" placeholder="you@example.com" :error="!!emailError" />

        <p v-if="!!emailError" class="text-sm text-red-500 dark:text-red-400 mt-2">
          {{ emailError }}
        </p>
      </div>

      <!-- Cloudflare Turnstile -->
      <div class="flex justify-center">
        <NuxtTurnstile v-model="turnstileToken" />
      </div>

      <!-- Button -->
      <UiBaseButton type="submit" class="w-full" :disabled="loading || !turnstileToken">
        {{ $t('auth.sign_in.button') }}
      </UiBaseButton>

      <!-- System error -->
      <p v-if="errorMsg" class="text-red-600 dark:text-red-500 text-sm text-center">
        {{ errorMsg }}
      </p>

      <UiBaseButton type="button" class="w-full" variant="secondary" @click="signInWithGoogle">
        <span>
          {{ $t('auth.sign_in.continue_with_google') }}
        </span>
      </UiBaseButton>

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
