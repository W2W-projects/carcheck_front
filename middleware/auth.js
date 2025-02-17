import { useTokenStore } from "@/stores/token";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const tokenStore = useTokenStore();
  const authStore = useAuthStore();

  if (!tokenStore.loggedIn || !authStore.user || Object.keys(authStore.user).length === 0) {
    return navigateTo('/auth/login');
  }

});
