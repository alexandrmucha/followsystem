<template>
  <AuthCard>
    <!-- Title -->
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
      {{ $t('auth.sign_in.title') }}
    </h1>

    <!-- Google login -->
    <div class="space-y-4">

      <BaseButton type="button" :disabled="loading" @click="signInWithGoogle">
        <span v-if="loading">
          {{ $t('auth.common.loading') }}
        </span>

        <span v-else>
          {{ $t('auth.sign_in.button') }}
        </span>
      </BaseButton>

      <!-- Error -->
      <p v-if="errorMsg" class="text-red-500 dark:text-red-400 text-sm text-center">
        {{ errorMsg }}
      </p>

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

const supabase = useSupabaseClient()

const loading = ref(false)
const errorMsg = ref('')

const signInWithGoogle = async () => {
  errorMsg.value = ''
  loading.value = true

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/confirm'
    }
  })

  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }
}
</script>