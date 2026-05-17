export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  if (!auth.loggedIn) {
    return navigateTo('/sign-in');
  }
});