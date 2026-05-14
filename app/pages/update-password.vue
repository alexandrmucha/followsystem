<template>
  <AuthCard>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.update_password.title') }}
    </h1>

    <!-- Form -->
    <form @submit.prevent="updatePassword">
      
      <!-- Password -->
      <div class="space-y-6">
        <PasswordValidationInput v-model="password" :label="$t('auth.common.password')" @validity="isPasswordValid = $event" />

        <!-- Button -->
        <BaseButton type="submit" :disabled="loading">
          {{ $t('auth.update_password.button') }}
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
  title: t('auth.update_password.title')
})

definePageMeta({
  layout: 'auth',
})

const password = ref('')
const isPasswordValid = ref(false)

const loading = ref(false)
const errorMsg = ref('')

const supabase = useSupabaseClient()

/* =========================
   ERROR MAPPING
========================= */

const authUpdatePasswordErrorMap: Record<string, string> = {
  'New password should be different from the old password.': 'auth.update_password.errors.same_as_old'
}

const getUpdatePasswordError = (error: any) => {
  if (!error?.message) return 'auth.errors.generic'
  return authUpdatePasswordErrorMap[error.message] || 'auth.errors.generic'
}

/* =========================
   UPDATE PASSWORD
========================= */

const updatePassword = async () => {
  errorMsg.value = ''

  if (!password.value) {
    errorMsg.value = t('auth.errors.password_required')
    return
  }

  if (!isPasswordValid.value) return

  loading.value = true

  const { error } = await supabase.auth.updateUser({
    password: password.value
  })

  loading.value = false

  if (error) {
    errorMsg.value = t(getUpdatePasswordError(error))
    return
  }

  navigateTo('/settings?password_changed=true')
}
</script>

<style>
</style>