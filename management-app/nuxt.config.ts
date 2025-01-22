// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {

      API_URL: process.env.API_URL
    }

  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  compatibilityDate: "2025-01-16",

})