import { computed, unref, isRef } from "vue";
import { formatMonthDate } from "~/components/utils/dateUtils";
import { isEmpty } from "../utils/helpers";

export function useFormattedWhenValue(
  getValue,
  startDate,
  endDate,
  dateFormat
) {
  const filterValueWhenFormatted = computed(() => {
    const value = typeof getValue === "function" ? getValue() : unref(getValue);

    if (isEmpty(value)) {
      const firstDayNextMonth = formatMonthDate(startDate.value, dateFormat);
      const firstDayLastMonth = formatMonthDate(endDate.value, dateFormat);
      return `${firstDayNextMonth} - ${firstDayLastMonth}`;
    } else {
      const firstDayNextMonth = formatMonthDate(value[0], dateFormat);
      const firstDayLastMonth = formatMonthDate(value[1], dateFormat);
      return `${firstDayNextMonth} - ${firstDayLastMonth}`;
    }
  });

  return { filterValueWhenFormatted };
}
