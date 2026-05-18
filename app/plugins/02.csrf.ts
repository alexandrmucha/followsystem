export default defineNuxtPlugin(async () => {
  const csrfStore = useCsrfStore()

  await useAsyncData('init-csrf-token', async () => {
    await csrfStore.fetchToken()
    return true
  })
})
