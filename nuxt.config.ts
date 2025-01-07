// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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