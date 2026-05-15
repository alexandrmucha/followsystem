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
    const { error } = await supabase.functions.invoke("gmail-exchange", {
      body: { code }
    })

    if (error) throw error

    navigateTo("/dashboard")
  } catch (err) {
    console.error("Gmail connect failed:", err)
    navigateTo("/settings?error=gmail")
  }
})
</script>