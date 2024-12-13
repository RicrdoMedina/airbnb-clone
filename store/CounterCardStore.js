// store/filters.ts
import { defineStore } from "pinia";

export const useFiltersStore = defineStore("counterStore", () => {
  const count = ref(0);

  const increment = () => count.value++;

  const double = computed(() => count.value * 2);

  return {
    count,
    increment,
    double,
  };
});
