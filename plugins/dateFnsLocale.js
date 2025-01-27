export default defineNuxtPlugin(async (nuxtApp) => {
  let es;

  if (process.env.NODE_ENV === "production") {
    es = (await import("date-fns/locale/index")).es;
  } else {
    es = (await import("date-fns/locale")).es;
  }

  nuxtApp.provide("localeEs", es);
});
