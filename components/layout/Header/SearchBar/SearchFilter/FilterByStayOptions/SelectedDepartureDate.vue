<template>
  <div
    :class="containerDynamicClasses"
    @click.stop.prevent="toggleSubFilter('output')"
    v-if="!showWhenOptions"
  >
    <!-- SelectedDepartureDateHoverBackground -->
    <template v-if="filterStates.arrival">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -left-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <!-- SelectedDepartureDateHoverBackground -->
    <template v-if="filterStates.who">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -right-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <div
      class="w-full h-full z-50 flex flex-col items-start justify-center relative"
    >
      <span
        :class="labelDynamicClasses"
        >Salida</span
      >
      <div :class="blockDynamicClasses">
        {{ formattedDepartureDate }}
        <span
          v-if="values.approximateDays"
          class="text-xs ml-1 text-light font-normal"
          >±{{ values.approximateDays }}</span
        >
      </div>
      <span
        class="flex items-center justify-center w-6 h-6 absolute right-0 cursor-pointer rounded-full hover:bg-custom-gray-300 ease-in-out transition-all duration-500"
        v-show="shouldShowCloseIcon"
        @click.stop.prevent="handleResetDateRange"
      >
        <NuxtImg
          class="w-3"
          src="/images/CloseIcon.svg"
          alt="Close"
          loading="lazy"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useAppDataStore } from "~/store/app/AppDataStore";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
import { es } from "date-fns/locale/index.js";
import { format } from "date-fns";

const useSearchBar = useSearchBarStore();
const useDataStore = useAppDataStore();

const { toggleSubFilter, filterStates, values, handleResetDateRange } =
  useSearchBar;

const { isFilterActive, showWhenOptions } = storeToRefs(useSearchBar);

const { isLoading } = storeToRefs(useDataStore);

const defaultClasses = computed(() => ({
  filter: true,
  "w-36": true,
  "h-full": true,
  "rounded-full": true,
  flex: true,
  "flex-col": true,
  "items-center": true,
  "justify-center": true,
  "px-6": true,
  relative: true,
  group: true,
  "z-0": filterStates.arrival,
  "z-10": !filterStates.arrival,
  "before:hidden": isFilterActive.value,
  "before:content-['']": true,
  "before:bg-custom-gray-400": true,
  "before:absolute": true,
  "before:left-0": true,
  "before:w-px": true,
  "before:h-8": true,
}));

const blockDefaultClasses = computed(() => ({
  "w-full": true,
  "bg-transparent": true,
  "border-0": true,
  "outline-0": true,
  "text-sm": true,
  "text-ellipsis": true,
  "overflow-hidden": true,
  "whitespace-nowrap": true,
  "background-animation": isLoading.value,
  "rounded-md": isLoading.value,
  "mt-0.5": isLoading.value,
}));

const blockActiveClasses = "text-bold font-medium";

const activeClasses = "bg-white shadow-search-box-inactive";

const inactiveClasses = computed(() => ({
  "hover:bg-custom-gray-200": !isFilterActive.value,
  "hover:bg-custom-gray-300":
    isFilterActive.value &&
    !filterStates.output &&
    !filterStates.arrival &&
    !filterStates.who,
}));

const blockInactiveClasses = "text-light";

const labelDefaultClasses =
  "text-xs font-medium text-bold rounded-md";

const labelActiveClasses = "background-animation";

const labelInactiveClasses = "";

const { dynamicClasses: containerDynamicClasses } = useDynamicClasses(
  () => filterStates.output,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const { dynamicClasses: blockDynamicClasses } = useDynamicClasses(
  () => values.travelDate.length > 1,
  blockDefaultClasses,
  blockActiveClasses,
  blockInactiveClasses
);

const { dynamicClasses: labelDynamicClasses } = useDynamicClasses(
  isLoading,
  labelDefaultClasses,
  labelActiveClasses,
  labelInactiveClasses
);

const formattedDepartureDate = computed(() => {
  if (values.travelDate.length < 2) return "Agregar fecha";

  const formattedDate = format(values.travelDate[1], "dd MMM", {
    locale: es,
  });

  return formattedDate;
});

const shouldShowCloseIcon = computed(() => {
  return values.travelDate.length > 1 && filterStates.output;
});
</script>
