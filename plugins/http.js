import Http from "~/utils/Http";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const baseURL =
    `${config.public.NUXT_PUBLIC_SERVER_URL}/api` ||
    "http://localhost:3000/api";

  Http.init(baseURL);

  return {
    provide: {
      http: Http,
    },
  };
});
