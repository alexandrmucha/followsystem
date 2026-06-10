<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
    <LayoutAnnouncements />
    <LandingNavbar />

    <div class="flex-1 flex flex-col items-center justify-center px-4 py-16">
      <LayoutAlerts />
      <slot />
    </div>
  </div>
</template>
