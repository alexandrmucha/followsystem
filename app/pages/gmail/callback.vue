<template>
  <div v-if="!!code">{{ $t('connect_gmail.connecting') }}</div>
  <div v-else>Missing authorization code</div>
</template>

<script setup lang="ts">
import { FunctionsHttpError } from '@supabase/supabase-js'

const route = useRoute()
const supabase = useSupabaseClient()

const code = route.query.code as string

onMounted(async () => {
  if (!code) return

  try {
    const { error } = await supabase.functions.invoke("gmail-exchange", {
      body: { code }
    })

    if (error) {
      throw error
    }

    navigateTo("/dashboard")

  } catch (err: any) {
    let backendError: string | null = null

    // 🟢 read backend error from Supabase HttpError
    if (err instanceof FunctionsHttpError) {
      const body = await err.context.json()
      backendError = body.error
    }

    // 🔥 SPECIFIC ERRORS

    if (backendError === 'GMAIL_ALREADY_CONNECTED') {
      navigateTo("/settings?error=gmail_already_connected")
      return
    }

    if (backendError === 'DIFFERENT_GOOGLE_ACCOUNT') {
      navigateTo("/settings?error=different_google_account")
      return
    }

    // 🔴 fallback
    navigateTo("/settings?error=gmail_general")
  }
})
</script>