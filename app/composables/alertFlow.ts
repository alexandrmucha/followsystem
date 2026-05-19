export const useAlertFlow = () => {
  const alerts = useAlertStore()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const success = (message: string) => {
    alerts.success(message)
    scrollToTop()
  }

  const error = (message: string) => {
    alerts.error(message)
    scrollToTop()
  }

  return {
    success,
    error
  }
}