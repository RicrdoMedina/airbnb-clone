import { computed, unref, isRef } from "vue";
import { formatMonthDate } from "~/utils/dateUtils";
import { isEmpty } from "~/utils/helpers";

export function useFormattedWhenValue(
  getValue,
  startDate,
  endDate,
  dateFormat
) {
  const filterValueWhenFormatted = computed(() => {
    const value = typeof getValue === "function" ? getValue() : unref(getValue);

    if (isEmpty(value)) {
      const firstDayNextMonth = formatMonthDate(startDate, dateFormat);
      const firstDayLastMonth = formatMonthDate(endDate, dateFormat);
      return {
        startDate: `${firstDayNextMonth}`,
        endDate: `${firstDayLastMonth}`,
      };
    } else {
      if (value.length > 1) {
        const firstDayNextMonth = formatMonthDate(value[0], dateFormat);
        const firstDayLastMonth = formatMonthDate(value[1], dateFormat);
        return {
          startDate: `${firstDayNextMonth}`,
          endDate: `${firstDayLastMonth}`,
        };
      }
      const firstDayNextMonth = formatMonthDate(value[0], dateFormat);
      return {
        startDate: `${firstDayNextMonth}`,
        endDate: "",
      };
    }
  });

  return { filterValueWhenFormatted };
}
