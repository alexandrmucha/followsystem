<template>
  <div v-if="!!code">{{ $t('connect_gmail.connecting') }}</div>
  <div v-else>Missing authorization code</div>
</template>

<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

const code = route.query.code as string

onMounted(async () => {
  if (!code) return

  try {
    const { data, error } = await supabase.functions.invoke("gmail-exchange", {
      body: { code }
    })

    if (error) {
      throw error
    }

    // ✔ success
    navigateTo("/dashboard")

  } catch (err: any) {
    console.error("Gmail connect failed:", err)

    // 🔥 extract backend error code (Supabase wraps it differently)
    const backendError =
      err?.context?.error ||
      err?.data?.error ||
      err?.error

    if (backendError === 'GMAIL_ALREADY_CONNECTED') {
      navigateTo("/settings?error=gmail_already_connected")
      return
    }

    navigateTo("/settings?error=gmail_general")
  }
})
</script>