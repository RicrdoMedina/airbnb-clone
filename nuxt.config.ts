// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_SERVER_URL: process.env.NUXT_PUBLIC_SERVER_URL || "https://default-server.com",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'es',
      },
      bodyAttrs: {
        class: 'body',
      },
    },
  },
  devtools: { enabled: true },
  modules: ["@pinia/nuxt","vue3-carousel-nuxt"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});