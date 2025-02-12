import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  debugger
  if (authStore.user && Object.keys(authStore.user).length > 0) {
    return navigateTo('/');
  }
});
