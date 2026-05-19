export default defineNuxtPlugin(() => {
  const router = useRouter()
  const alerts = useAlertStore()

  router.afterEach((to, from) => {
    if (to.fullPath !== from.fullPath) {
      alerts.clear()
    }
  })
})