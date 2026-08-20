// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/fonts.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    // "~/assets/css/admin.css",
  ],

  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
  ],

  plugins: ["~/plugins/fontawesome.js", "~/plugins/eventBus.js"],

  vite: {
    build: {
      rolldownOptions: {
        checks: { pluginTimings: false },
      },
    },
  },

  runtimeConfig: {
    public: {
      stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  compatibilityDate: "2024-09-05",
});
