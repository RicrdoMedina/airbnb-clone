import { computed } from "vue";
import { formatMonthDate } from "~/components/utils/dateUtils";

export function useFormattedWhenValue(
  whenValue,
  startDate,
  endDate,
  dateFormat
) {
  const filterValueWhenFormatted = computed(() => {
    if (!whenValue.value.length) {
      const firstDayNextMonth = formatMonthDate(startDate.value, dateFormat);
      const firstDayLastMonth = formatMonthDate(endDate.value, dateFormat);
      return `${firstDayNextMonth} - ${firstDayLastMonth}`;
    } else {
      const firstDayNextMonth = formatMonthDate(whenValue.value[0], dateFormat);
      const firstDayLastMonth = formatMonthDate(whenValue.value[1], dateFormat);
      return `${firstDayNextMonth} - ${firstDayLastMonth}`;
    }
  });

  return { filterValueWhenFormatted };
}
