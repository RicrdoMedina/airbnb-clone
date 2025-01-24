import Http from "~/utils/Http";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      http: Http,
    },
  };
});
