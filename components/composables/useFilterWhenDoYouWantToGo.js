import { computed } from "vue";

export function useFilterWhenDoYouWantToGo(
  values,
  stayDurations,
  availableMonths,
  truncateString
) {
  const filterWhenDoYouWantToGoFormatted = computed(() => {
    const selected = stayDurations.value.filter(
      (item) => item.id === values.stayDuration
    );

    if (values.selectedMonths.length > 0) {
      let message = "";
      const selectedIdsList = values.selectedMonths;

      availableMonths.value.forEach((month) => {
        selectedIdsList.forEach((id) => {
          if (id === month.id) {
            message += `${month.shortName},`;
          }
        });
      });

      return truncateString(
        `${selected[0]["name"].toLowerCase()} en ${message}`,
        24
      );
    }

    return truncateString(`Cualquier ${selected[0]["name"].toLowerCase()}`, 24);
  });

  return { filterWhenDoYouWantToGoFormatted };
}
