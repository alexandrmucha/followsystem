export const useSidebar = () => {
  // Desktop state
  const desktopOpen = useState<boolean>('sidebar-desktop-open', () => true)

  // Mobile state
  const mobileOpen = useState<boolean>('sidebar-mobile-open', () => false)

  const sidebarOpen = computed(() => ({
    desktop: desktopOpen.value,
    mobile: mobileOpen.value
  }))

  /* =========================
     DESKTOP API
  ========================= */

  const openDesktop = () => {
    desktopOpen.value = true
  }

  const closeDesktop = () => {
    desktopOpen.value = false
  }

  const toggleDesktop = () => {
    desktopOpen.value = !desktopOpen.value
  }

  /* =========================
     MOBILE API
  ========================= */

  const openMobile = () => {
    mobileOpen.value = true
  }

  const closeMobile = () => {
    mobileOpen.value = false
  }

  const toggleMobile = () => {
    mobileOpen.value = !mobileOpen.value
  }

  return {
    desktopOpen,
    mobileOpen,
    sidebarOpen,

    openDesktop,
    closeDesktop,
    toggleDesktop,

    openMobile,
    closeMobile,
    toggleMobile,
  }
}