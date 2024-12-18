<template>
  <div
    :class="dynamicClasses"
    @click.stop.prevent="toggleSubFilter('arrival')"
    v-if="!showWhenOptions"
  >
    <!-- SelectedArrivalDateHoverBackground -->
    <template v-if="filterStates.where">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -left-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <!-- SelectedArrivalDateHoverBackground -->
    <template v-if="filterStates.output">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -right-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <div
      class="w-full h-full z-50 flex flex-col items-center justify-center relative"
    >
      <span class="w-full text-xs font-medium text-bold">Llegada</span>
      <div :class="blockDynamicClasses">
        {{ formattedArrivalDate }}
        <span
          v-if="values.approximateDays"
          class="text-xs ml-1 text-light font-normal"
          >±{{ values.approximateDays }}</span
        >
      </div>

      <span
        class="flex items-center justify-center w-6 h-6 absolute right-0 cursor-pointer rounded-full hover:bg-custom-gray-300 ease-in-out transition-all duration-500"
        v-show="showCloseIcon"
        @click.stop.prevent="handleResetDateRange"
      >
        <img class="w-3" src="/images/CloseIcon.svg" alt="Close" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { isEmpty } from "~/components/utils/helpers";
const useSearch = useFiltersStore();

const { toggleSubFilter, filterStates, values, handleResetDateRange } =
  useSearch;

const {
  isFilterActive,
  showWhenOptions,
  tripStartDate,
  tripEndDate,
  dateRange,
} = storeToRefs(useSearch);

const defaultClasses = computed(() => ({
  "filter": true,
  "w-36": true,
  "h-full": true,
  relative: true,
  "rounded-full": true,
  flex: true,
  "flex-col": true,
  "items-center": true,
  "justify-center": true,
  "px-6": true,
  relative: true,
  group: true,
  "z-10": true,
  "before:hidden": isFilterActive.value,
  "before:content-['']": true,
  "before:bg-custom-gray-400": true,
  "before:absolute": true,
  "before:left-0": true,
  "before:w-px": true,
  "before:h-8": true,
}));

const activeClasses = "bg-white shadow-search-box-inactive";

const inactiveClasses = computed(() => ({
  "hover:bg-custom-gray-200": !isFilterActive.value,
  "hover:bg-custom-gray-300":
    isFilterActive.value &&
    !filterStates.arrival &&
    !filterStates.where &&
    !filterStates.output,
}));

const blockDefaultClasses =
  "w-full bg-transparent border-0 outline-0 text-sm text-ellipsis overflow-hidden whitespace-nowrap";

const blockActiveClasses = "text-bold font-medium";

const blockInactiveClasses = "text-light";

const { dynamicClasses } = useDynamicClasses(
  () => filterStates.arrival,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const { dynamicClasses: blockDynamicClasses } = useDynamicClasses(
  () => !isEmpty(dateRange.value),
  blockDefaultClasses,
  blockActiveClasses,
  blockInactiveClasses
);

const formattedArrivalDate = computed(() => {
  if (isEmpty(dateRange.value)) return "Agregar fecha";

  const formattedDate = format(dateRange.value[0], "dd MMM", {
    locale: es,
  });

  return formattedDate;
});

const showCloseIcon = computed(() => {
  return !isEmpty(dateRange.value) && filterStates.arrival;
});
</script>
