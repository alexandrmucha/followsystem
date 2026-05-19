export default defineNuxtPlugin(() => {
  const router = useRouter()
  const alerts = useAlertStore()

  router.afterEach(() => {
    alerts.clear()
  })
})