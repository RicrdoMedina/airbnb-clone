<template>
  <div
    :class="dynamicClasses"
    @click.stop.prevent="toggleSubFilter('when')"
    v-if="showWhenOptions"
  >
    <span class="w-full text-xs font-medium text-bold">Cuándo </span>
    <div :class="inputDynamicClasses">
      {{ selectedFilterValue }}
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFormattedWhenValue } from "~/components/composables/useFormattedWhenValue";
import { useFilterWhenDoYouWantToGo } from "~/components/composables/useFilterWhenDoYouWantToGo";
import { truncateString } from "~/utils/stringUtils";

const useSearch = useFiltersStore();

const { toggleSubFilter, filterStates, values } = useSearch;

const {
  isFilterActive,
  showWhenOptions,
  stayDurations,
  availableMonths,
  tripStartDate,
  tripEndDate,
  activeSubFilter,
} = storeToRefs(useSearch);

const defaultClasses = computed(() => ({
  filter: true,
  "w-60": true,
  "h-full": true,
  "rounded-full": true,
  flex: true,
  "flex-col": true,
  "items-center": true,
  "justify-center": true,
  "px-6": true,
  "ease-in-out": true,
  "transition-all": true,
  "duration-500": true,
  "z-10": true,
  "before:hidden": isFilterActive.value,
  "before:content-['']": true,
  "before:bg-custom-gray-400": true,
  "before:absolute": true,
  "before:left-0": true,
  "before:w-px": true,
  "before:h-8": true,
}));

const inputDefaultClasses = "w-full bg-transparent border-0 outline-0 text-sm";

const activeClasses = "bg-white shadow-xl";

const inputActiveClasses = "text-bold font-medium";

const inactiveClasses = computed(() => ({
  "hover:bg-custom-gray-200": !isFilterActive.value,
  "hover:bg-custom-gray-300": isFilterActive.value && !filterStates.when,
}));

const inputInactiveClasses = "text-light";

const { filterValueWhenFormatted } = useFormattedWhenValue(
  () => values.when,
  tripStartDate,
  tripEndDate,
  "d MMM."
);

const { filterWhenDoYouWantToGoFormatted } = useFilterWhenDoYouWantToGo(
  values,
  stayDurations,
  availableMonths,
  truncateString
);

const { dynamicClasses } = useDynamicClasses(
  () => filterStates.when,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const { dynamicClasses: inputDynamicClasses } = useDynamicClasses(
  () => values.when,
  inputDefaultClasses,
  inputActiveClasses,
  inputInactiveClasses
);


const selectedFilterValue = computed(() =>
  activeSubFilter.value === "Month"
    ? `${filterValueWhenFormatted.value.startDate} - ${filterValueWhenFormatted.value.endDate}`
    : filterWhenDoYouWantToGoFormatted.value
);
</script>
