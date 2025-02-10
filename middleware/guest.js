import { useTokenStore } from "../stores/token";

export default defineNuxtRouteMiddleware((to, from) => {
  const tokenStore = useTokenStore();

  if (tokenStore.loggedIn) {
    console.log("one two...");
    return navigateTo('/dashboard');
  }
});
