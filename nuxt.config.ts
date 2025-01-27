// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_SERVER_URL:
        process.env.NUXT_PUBLIC_SERVER_URL || "https://default-server.com",
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "es",
      },
      bodyAttrs: {
        class: "body",
      },
    },
  },

  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "vue3-carousel-nuxt", "@nuxt/image"],

  image: {
    formats: ["webp", "avif"],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "2025-01-27"
});