import { computed } from "vue";

export function useValueInputRegion(values, searchRegions) {
  const getValueInputRegion = computed(() => {
    if (!values.where) return "";
    const region = searchRegions.value.find(
      (region) => region.id === values.where
    );
    return region?.name || "";
  });

  return {
    getValueInputRegion,
  };
}
